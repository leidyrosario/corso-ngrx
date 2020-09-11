import { createAction } from "@ngrx/store";
export const openClientPanel = createAction('[ui] Open Client Panel');
export const openInvoicePanel = createAction('[ui] Open Invoice Panel');
export const closeClientPanel = createAction('[ui] Close Client Panel');
export const closeInvoicePanel = createAction('[ui] Close Invoice Panel');
