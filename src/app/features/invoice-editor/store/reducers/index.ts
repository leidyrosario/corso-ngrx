import { Client } from "src/app/model/client";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import {reducer  as clientReducer} from './clients.reducer';
import { HttpStatus } from 'src/app/model/http.status';
import { reducer as httpStatusReducer } from './http-status.reducer';
import { InvoiceEditorUi } from 'src/app/model/invoice-editor-ui';
import { reducer as uiReducer} from './ui.reducer';
import { InvoicesState, reducer as InvoicesReducer } from './invoices.reducer';

export interface InvoiceEditorState {
    clients: Client[];
    invoices: InvoicesState;
    ui: InvoiceEditorUi;
    httpStatus: HttpStatus;
  }

export const reducers: ActionReducerMap<InvoiceEditorState> = {
    clients: clientReducer,
    invoices: InvoicesReducer,
    ui: uiReducer,
    httpStatus: httpStatusReducer
  };

export const selectInvoiceEditor = createFeatureSelector<InvoiceEditorState>('invoiceEditor');
