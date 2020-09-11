import { InvoiceEditorState } from "./../reducers/index";
import { createSelector } from '@ngrx/store';
import { selectInvoiceEditor } from '../reducers';

export const getInvoiceEditorHttpStatus = createSelector(
    selectInvoiceEditor,
    (state: InvoiceEditorState) => state.httpStatus
);
