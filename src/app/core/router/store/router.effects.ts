import * as RouterActions from './router.actions';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';


@Injectable()

export class RouterEffects {
    goEffect$ = createEffect(() => this.actions$
        .pipe(
            ofType(RouterActions.go),
            tap( action => {
                this.router.navigate(action.path, action.extras);
            })
        ), { dispatch: false}
    );

    backEffect$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => this.location.back())
    ), { dispatch: false});

    forwardEffect$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.forward),
        tap(() => this.location.forward())
    ), { dispatch: false});

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
        ) {}
}
