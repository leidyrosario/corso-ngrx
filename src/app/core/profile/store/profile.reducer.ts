import * as AuthActions from "./../../auth/store/auth.actions";
import * as ProfileActions from './profile.actions';
import { User } from './../../../model/user';
import { createReducer, on, Action } from '@ngrx/store';
export interface ProfileState {
    user: User;
    error: boolean;
}

export const initialState: ProfileState = {
    user: {} as User,
    error: false
};
const profileReducer = createReducer(
    initialState,
    on(ProfileActions.loadProfileSuccess, (state, action) => ({ user: {...action.user}, error: false })),
    on(ProfileActions.editProfileSuccess, (state, action) => ({ user: {...action.user}, error: false })),
    on(ProfileActions.loadProfileFailed, (state, action) => ({...state, error: true})),
    on(ProfileActions.editProfileFailed, (state, action) => ({...state, error: true})),
    on(AuthActions.logoutSuccess, (state, action) => ({user : {} as User, error: true})),
);

export function reducer(state: ProfileState | undefined, action: Action) {
    return profileReducer(state, action);
}
