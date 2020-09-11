import { InvoicesEffects } from "./store/effects/invoices.effects";
import { ClientEffects } from "./store/effects/clients.effects";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceEditorRoutingModule } from './invoice-editor-routing.module';
import { InvoiceEditorComponent } from './invoice-editor.component';
import { reducers } from './store/reducers';
import { PanelClientComponent } from './components/panel-client/panel-client.component';
import { PanelClientHeaderComponent } from './components/panel-client/components/panel-client-header.component';
import { PanelClientItemComponent } from './components/panel-client/components/panel-client-item.component';
import { ClientService } from './services/clients.service';
import { InvoiceEditorHttpStatusComponent } from './components/invoice-editor-http-status/invoice-editor-http-status.component';
import { PanelInvoicesComponent } from './components/panel-invoices/panel-invoices.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoicesService } from './services/invoices.service';
import { InvoicesEditorEffects } from './store/effects/invoices-editor.effects';

@NgModule({
  declarations: [
    InvoiceEditorComponent,
    PanelClientComponent,
    PanelClientHeaderComponent,
    PanelClientItemComponent,
    InvoiceEditorHttpStatusComponent,
    PanelInvoicesComponent,
    InvoiceFormComponent],
  imports: [
    CommonModule,
    InvoiceEditorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('invoiceEditor', reducers),
    EffectsModule.forFeature([
      ClientEffects,
      InvoicesEffects,
      InvoicesEditorEffects
    ]),
  ],
  providers: [
    ClientService,
    InvoicesService
  ]
})
export class InvoiceEditorModule { }
