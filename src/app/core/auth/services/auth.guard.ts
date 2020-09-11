import * as RouterActions from "./../../router/store/router.actions";
import { getToken } from "./../store/auth.selectors";
import { AppState } from "./../../core.module";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Store, select } from '@ngrx/store';
import { tap, map } from "rxjs/operators";
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>) {}

    path: import ("@angular/router").ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select(getToken),
            map(token => !!token),
            tap(isLogged => {
                if (!isLogged) {
                    this.store.dispatch(RouterActions.go({path: ['login']}));
                }
            })
        );
    }
}
