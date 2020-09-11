import { AppState } from "./../../core.module";
import { ProfileState } from "./profile.reducer";
import { createSelector } from '@ngrx/store';

export const getProfile = (state: AppState) => state.profile;

export const getProfileUser = createSelector(
    getProfile,
    (state: ProfileState) => state.user
);

export const getProfileUserName = createSelector(
    getProfile,
    (state: ProfileState) => state.user.name
);
