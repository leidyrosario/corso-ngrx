import * as ClientActions from "./../actions/clients.actions";
import { HttpStatus, StatusType } from "src/app/model/http.status";
import { createReducer, Action, on } from "@ngrx/store";

export const initialState: HttpStatus = { type: null, reason: null };

const httpStatusReducer = createReducer(
    initialState,
    on(ClientActions.editClientFailed, () => ({ type: 'error' as StatusType, reason: 'editClientFailed' })),
    on(ClientActions.addClientFailed, () => ({ type: 'error' as StatusType, reason: 'addClientFailed' })),
    on(ClientActions.loadClientFailed, () => ({ type: 'error' as StatusType, reason: 'loadClientFailed' })),

    // on(ClientActions.loadClientSuccess, () => ({ type: 'success', reason: 'loadClientSuccess' })),
    on(ClientActions.editClientSuccess, () => ({ type: 'error' as StatusType, reason: 'editClientSuccess' })),
    on(ClientActions.addClientSuccess, () => ({ type: 'error' as StatusType, reason: 'addClientSuccess' })),

);

export function reducer(state: HttpStatus | undefined, action?: Action) {
    return httpStatusReducer(state, action);
}
