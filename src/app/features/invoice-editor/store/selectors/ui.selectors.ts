import { InvoiceEditorUi } from "src/app/model/invoice-editor-ui";
import { createSelector } from '@ngrx/store';
import { selectInvoiceEditor, InvoiceEditorState } from '../reducers';

export const getUi = createSelector(
    selectInvoiceEditor,
    (state: InvoiceEditorState) => state.ui
);

export const getClientsPanelOpened = createSelector(
    getUi,
    (state: InvoiceEditorUi) => state.isClientsPanelOpened
);

export const getInvoicesPanelOpened = createSelector(
    getUi,
    (state: InvoiceEditorUi) => state.isInvoicePanelOpened
);
