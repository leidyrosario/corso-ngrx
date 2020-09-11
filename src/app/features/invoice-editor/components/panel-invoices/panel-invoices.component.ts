import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from 'src/app/model/invoice';

@Component({
  selector: 'app-panel-invoices',
  template: `
    <div
    class="sidepanel sidepanel-left"
    [ngClass]="{'sidepanel-left-hide': !show}"
    >
    <div class="row h3">
      <div class="col">
        <i class="fa fa-plus-circle" (click)="createNewInvoice.emit()"></i>
        INVOICES
      </div>
      <div class="col text-right">
        <i class="far fa-times-circle" (click)="closePanel.emit()"></i>
      </div>
    </div>


      <li
      class="list-group-item list-group-item-action d-flex flex-row justify-content-between"
      *ngFor="let invoice of invoices"
      [ngClass]="{'active': invoice.id === activeInvoice?.id}"
      (click)="setActive.emit(invoice)"
      >
      <div>
        <small>{{invoice.invoiceNumber}}. {{invoice.date | date}}</small>
        <div>{{invoice.subject}}</div>
      </div>


      <div>
        {{invoice.total | currency}}
        <i class="fa fa-trash" (click)="deleteHandler(invoice, $event)"></i>
      </div>
      </li>


    </div>
  `,
  styleUrls: ['./panel-invoices.component.css']
})
export class PanelInvoicesComponent {
  @Input() show: boolean;
  @Input() invoices: Invoice[];
  @Input() activeInvoice: Invoice;
  @Output() closePanel: EventEmitter<void> = new EventEmitter<void>();
  @Output() setActive: EventEmitter<Invoice> = new EventEmitter<Invoice>();
  @Output() createNewInvoice: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteInvoice: EventEmitter<Invoice> = new EventEmitter<Invoice>();

  deleteHandler(invoice: Invoice, event: MouseEvent) {
    event.stopPropagation();
    this.deleteInvoice.emit(invoice);
  }



}
