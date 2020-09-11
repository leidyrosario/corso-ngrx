import * as RouterActions from "./../../router/store/router.actions";
import * as ProfileActions from "./../../profile/store/profile.actions";
import { Auth } from "./../../../model/auth";
import * as AuthActions from "./auth.actions";
import { AuthService } from "./../services/auth.service";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { switchMap, catchError, map, tap, switchMapTo, mapTo, filter, exhaustMap } from "rxjs/operators";
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

    initEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            mapTo(this.authService.getToken()),
            filter(accessToken => !!accessToken),
            switchMap(accessToken => [
                AuthActions.saveAuth({auth: {accessToken}}),
                ProfileActions.loadProfile()
            ])
        )
    );



    loginEffec$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(
                ({email, password}) => this.authService.login(email, password)
                    .pipe(
                        map((auth: Auth) => AuthActions.loginSuccess({auth})),
                        catchError(() => of(AuthActions.loginFailed()))
                    )
                )
        )
    );

    loginSuccess$ = createEffect(() =>
       this.actions$.pipe(
           ofType(AuthActions.loginSuccess),
           tap(action => this.authService.saveAuth(action.auth)),
           switchMapTo([
                ProfileActions.loadProfile(),
                RouterActions.go({path: ['invoice-editor']})
           ])
       )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => this.authService.cleanAuth()),
            switchMapTo([
                RouterActions.go({path: ['login']}),
                AuthActions.logoutSuccess()
            ])
        )
    );


    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}
}
