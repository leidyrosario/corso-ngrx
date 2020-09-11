import * as UiActions from "./../actions/ui.actions";
import { InvoiceEditorUi } from "../../../../model/invoice-editor-ui";
import { createReducer, Action, on } from "@ngrx/store";

export const initialState: InvoiceEditorUi = {
    isClientsPanelOpened: false,
    isInvoicePanelOpened: false
};

const uiReducer = createReducer(
    initialState,
    on(UiActions.openClientPanel, state => ({...state, isClientsPanelOpened: true, isInvoicePanelOpened: false})),
    on(UiActions.openInvoicePanel, state => ({...state, isInvoicePanelOpened: true, isClientsPanelOpened: false})),

    on(UiActions.closeClientPanel, state => ({...state, isClientsPanelOpened: false})),
    on(UiActions.closeInvoicePanel, state => ({...state, isInvoicePanelOpened: false}))
);

export function reducer(state: InvoiceEditorUi, action?: Action) {
    return uiReducer(state, action);
}
