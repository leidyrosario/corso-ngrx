import * as InvoicesEditorActions from "./../actions/invoices-editor.actions";
import * as ClientsActions from "./../actions/clients.actions";
import { Client } from "src/app/model/client";
import { createReducer, Action, on } from "@ngrx/store";

export const initialState: Client[] = [];

const clientsReducer = createReducer(
    initialState,
    on(InvoicesEditorActions.initInvoicesEditorSuccess, (state, action) => [...action.clients]),
    on(ClientsActions.loadClientSuccess, (state, action) => [...action.clients]),
    on(ClientsActions.addClientSuccess, (state, action) => [...state, action.client]),
    on(ClientsActions.editClientSuccess, (state, action) => {
        return state.map( client => client.id === action.client.id ? {...client, ...action.client} : client
        );
    }),
);

export function reducer(state: Client[] | undefined, action?: Action) {
    return clientsReducer(state, action);
}
