import * as authActions from "./auth.actions";
import { createReducer, on } from '@ngrx/store';
import { Actions } from '@ngrx/store-devtools/src/reducer';

export interface AuthState {
    accessToken?: string;
    error?: boolean;
}

export const initialState: AuthState = {};

const authReducer = createReducer(
    initialState,
    on(authActions.saveAuth, (state, action) => ({accessToken: action.auth.accessToken, error: false})),
    on(authActions.loginSuccess, (state, action) => ({accessToken: action.auth.accessToken, error: false})),
    on(authActions.loginFailed, () => ({accessToken: null, error: true})),
    on(authActions.logoutSuccess, () => ({accessToken: null, error: false})),
);


export function reducer(state: AuthState | undefined, action: Actions) {
    return authReducer(state, action);
}
