import { Auth } from "./../../../model/auth";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Auth] Login',
    props<{email: string, password: string}>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{auth: Auth}>()
);

export const loginFailed = createAction(
    '[Auth] Login Failed'
);

export const logout = createAction(
    '[Auth] Logout'
);

export const logoutSuccess = createAction(
    '[Auth] Logout Success'
);

export const saveAuth = createAction(
    '[Auth] save',
    props<{auth: Auth}>()
);
