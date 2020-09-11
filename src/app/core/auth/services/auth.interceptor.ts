import * as RouterActions from "./../../router/store/router.actions";
import { switchMap, take, catchError } from "rxjs/operators";
import { getToken } from "./../store/auth.selectors";
import { AppState } from "./../../core.module";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Store, select } from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return this.store.select(getToken)
            .pipe(
                take(1),
                switchMap(token => {
                    const cloneReq = !!token ? req.clone({
                    setHeaders: {Authorization: 'bearer' + token}
                }) : req;
                    return next.handle(cloneReq)
                    .pipe(
                        catchError(err => {
                            if (err instanceof HttpErrorResponse) {
                                switch (err.status) {
                                    case 401:
                                        console.log('token expired');
                                        break;
                                    default:
                                    case 404:
                                        this.store.dispatch(RouterActions.go({path: ['/login']}));
                                        break;
                                }
                            }
                            return throwError(err);
                        })
                    );
            })
        );

}
}
