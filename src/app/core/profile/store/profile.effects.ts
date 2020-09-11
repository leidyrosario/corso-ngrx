import { ProfileService } from './../services/profile.service';
import * as ProfileActions from './profile.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {
    loadProfile$ = createEffect(() => this.actions$.pipe(
        ofType(ProfileActions.loadProfile),
        switchMap(
            () => this.profileService.load()
            .pipe(
                map(user => ProfileActions.loadProfileSuccess({user})),
                catchError(() => of(ProfileActions.loadProfileFailed()))
            )
            )
    ));

    editProfile$ = createEffect(() => this.actions$.pipe(
        ofType(ProfileActions.editProfile),
        switchMap(
            ({user}) => this.profileService.edit(user)
            .pipe(
                map(result => ProfileActions.editProfileSuccess({user: result})),
                catchError(() => of(ProfileActions.editProfileFailed()))
            )
            )
    ));


    constructor(
        private actions$: Actions,
        private profileService: ProfileService
        ) {}
}
