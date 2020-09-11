import { AuthState } from "./auth.reducer";
import { AppState } from "./../../core.module";
import { createSelector } from '@ngrx/store';

export const selectAuth = (state: AppState) => state.auth;

export const getToken = createSelector(
    selectAuth,
    (state: AuthState) => state.accessToken
);
