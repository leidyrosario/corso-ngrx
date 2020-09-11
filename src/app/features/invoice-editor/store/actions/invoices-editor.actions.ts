import { Client } from "./../../../../model/client";
import { createAction, props } from "@ngrx/store";
import { Invoice } from 'src/app/model/invoice';

export const initInvoicesEditor = createAction(
    '[Invoice Editor] Init'
);

export const initInvoicesEditorSuccess = createAction(
    '[Invoice Editor] Init success',
    props<{invoices: Invoice[], clients: Client[]}>()
);

export const initInvoicesFailed = createAction(
    '[Invoice Editor] Init failed'
);
