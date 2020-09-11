import { Invoice } from "./../../../../model/invoice";
import { createReducer, Action, on } from "@ngrx/store";
import * as InvoiceActions from "./../actions/invoices.actions";
import * as InvoicesEditorActions from "./../actions/invoices-editor.actions";

export interface InvoicesState {
    entities: Invoice[];
    activeInvoiceId: number;

}

export const initialState: InvoicesState = {
    entities: [],
    activeInvoiceId: null,
};

const invoicesReducer = createReducer(
    initialState,
    on(InvoicesEditorActions.initInvoicesEditorSuccess, (state, action) => ({...state, entities: action.invoices})),
    on(InvoiceActions.addInvoiceSuccess, (state, action) => ({...state, entities: [...state.entities, action.invoice]})),
    on(InvoiceActions.editInvoiceSuccess, (state, action) => ({
        ...state,
        entities: state.entities.map((invoice: Invoice) => invoice.id === action.invoice.id ? {...invoice, ...action.invoice} : invoice)
    })),
    on(InvoiceActions.deleteInvoiceSuccess, (state, action) => ({
        ...state,
        entities: state.entities.filter(invoice => invoice.id !== action.id)
    })),
    on(InvoiceActions.setActiveInvoice, (state, action) => ({...state, activeInvoiceId: action.id})),
    on(InvoiceActions.createNewInvoice, (state, action) => ({...state, activeInvoiceId: null}))
);



export function reducer(state: InvoicesState | undefined, action?: Action) {
    return invoicesReducer(state, action);
}
