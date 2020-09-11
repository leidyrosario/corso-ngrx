import { InvoiceEditorState, selectInvoiceEditor } from "./../reducers/index";
import { createSelector } from '@ngrx/store';

export const getClients = createSelector(
    selectInvoiceEditor,
    (state: InvoiceEditorState) => state.clients
);
