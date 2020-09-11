import { Invoice } from "./../../../../model/invoice";
import { selectInvoiceEditor, InvoiceEditorState } from "./../reducers/index";
import { createSelector } from "@ngrx/store";
export const getInvoices = createSelector(
    selectInvoiceEditor,
    (state: InvoiceEditorState) => state.invoices.entities
  );

/* export const getActiveInvoice = createSelector(
    selectInvoiceEditor,
    (state: InvoiceEditorState) => state.invoices.activeInvoiceId
  ); */

export const getActiveInvoice = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.invoices.entities
    .find(i => i.id === state.invoices.activeInvoiceId)
);

export const getNextInvoiceNumber = createSelector(
  selectInvoiceEditor,
  (state: InvoiceEditorState) => state.invoices.entities
    .reduce(
      (acc: number, curr: Invoice) => curr.invoiceNumber > acc ? curr.invoiceNumber : acc,
      0
    ) + 1
);

