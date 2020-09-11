import { User } from './../../../model/user';
import { createAction, props } from '@ngrx/store';


export const loadProfile = createAction(
    '[Profile] load'
);

export const loadProfileSuccess = createAction(
    '[Profile] load success',
    props<{user: User}>()
);

export const loadProfileFailed = createAction(
    '[Profile] load failed'
);

export const editProfile = createAction(
    '[Profile] edit',
    props<{user: User}>()
);

export const editProfileSuccess = createAction(
    '[Profile] edit success',
    props<{user: User}>()
);

export const editProfileFailed = createAction(
    '[Profile] edit failed'
);
