import { getInvoices, getActiveInvoice } from "./store/selectors/invoices.selector";
import { Invoice } from "./../../model/invoice";
import { getUi, getInvoicesPanelOpened, getClientsPanelOpened } from "./store/selectors/ui.selectors";
import { getInvoiceEditorHttpStatus } from "./store/selectors/http-status.selector";
import { getClients } from "./store/selectors/clients.selector";
import { AppState } from "./../../core/core.module";
import { Component } from '@angular/core';
import { Client } from 'src/app/model/client';
import { Store, select } from '@ngrx/store';
import * as InvoicesActions from './store/actions/invoices.actions';
import * as ClientsActions from "./store/actions/clients.actions";
import * as UiActions from "./store/actions/ui.actions";
import * as InvoicesEditorActions from "./store/actions/invoices-editor.actions";

@Component({
  selector: 'app-invoice-editor',
  template: `
    <div
    class="container-page"
    [ngClass]="{
      'container-page-with-left-panel-open': isInvoicesPanelOpened$ | async,
      'container-page-with-right-panel-open': isClientsPanelOpened$ | async
    }"
    >
      <app-invoice-editor-http-status
      [status]="httpStatus$ | async"
      ></app-invoice-editor-http-status>

      <app-invoice-form
      [activeInvoice]="activeInvoice$ | async"
      [isInvoicesPanelOpened]="isInvoicesPanelOpened$ | async"
      [isClientsPanelOpened]="isClientsPanelOpened$ | async"
      (saveInvoice)="saveInvoiceHandler($event)"
      (openInvoicesPanel)="openInvoicePanel()"
      (openClientsPanel)="openClientPanel()"
      ></app-invoice-form>

    </div>

    <app-panel-invoices
    [show]="(ui$ | async).isInvoicePanelOpened"
    [invoices]="invoices$ | async"
    [activeInvoice]="activeInvoice$ | async"
    (closePanel)="closeInvoicePanel()"
    (setActive)="setActiveHandler($event)"
    (createNewInvoice)="createNewInvoiceHandler()"
    (deleteInvoice)="deleteInvoiceHandler($event)"
    >
    </app-panel-invoices>


    <app-panel-client
    [show]="(ui$ | async).isClientsPanelOpened"
    [clients]="clients$ | async"
    (closePanel)="closeClientPanel()"
    (editClient)="editClientHandler($event)"
    (addClient)="addClientHandler($event)"
    ></app-panel-client>

  `,
  styles: [`
    .container-page {
      width: 100%;
      max-width: 960px;
      margin-left: 50px;
      transform: translateX(-50px);
      padding: 0 20px;
      transition: all 0.5s ease-in-out;
    }

    .container-page-with-left-panel-open {
      margin-left: 500px;
      transform: translateX(0);
    }

    .container-page-with-right-panel-open {
      margin-left: 0;
      transform: translateX(0);
    }
  `]
})
export class InvoiceEditorComponent {

  showPanel = true;
  clients$ = this.store.pipe(select(getClients));
  invoices$ = this.store.pipe(select(getInvoices));
  activeInvoice$ = this.store.pipe(select(getActiveInvoice));
  httpStatus$ = this.store.pipe(select(getInvoiceEditorHttpStatus));
  ui$ = this.store.pipe(select(getUi));
  isInvoicesPanelOpened$ = this.store.pipe(select(getInvoicesPanelOpened));
  isClientsPanelOpened$ = this.store.pipe(select(getClientsPanelOpened));


  constructor(private store: Store<AppState>) {
    // this.store.dispatch(ClientsActions.loadClients());
    this.store.dispatch(InvoicesEditorActions.initInvoicesEditor());
  }

  editClientHandler(client: Client) {
    this.store.dispatch(ClientsActions.editClient({client}));

  }

  addClientHandler(client: Client) {
    this.store.dispatch(ClientsActions.addClient({client}));
  }

  openClientPanel() {
    this.store.dispatch(UiActions.openClientPanel());
  }

  closeClientPanel() {
    this.store.dispatch(UiActions.closeClientPanel());
  }

  openInvoicePanel() {
    this.store.dispatch(UiActions.openInvoicePanel());
  }

  closeInvoicePanel() {
    this.store.dispatch(UiActions.closeInvoicePanel());
  }

  saveInvoiceHandler(invoice: Partial<Invoice>) {
    this.store.dispatch(InvoicesActions.saveInvoice({invoice}));
  }

  setActiveHandler(invoice: Invoice) {
    this.store.dispatch(InvoicesActions.setActiveInvoice({id: invoice.id}));
  }

  createNewInvoiceHandler() {
    this.store.dispatch(InvoicesActions.createNewInvoice());
  }

  deleteInvoiceHandler(invoice: Invoice) {
    this.store.dispatch(InvoicesActions.deleteInvoice({id: invoice.id}));
  }

}
