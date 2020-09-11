import { InvoiceItem } from "./../../../../model/invoice";
import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Invoice } from 'src/app/model/invoice';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  template: `
  {{form.valid}}
    <form [formGroup]="form" (ngSubmit)="saveHandler()" >
      <div class="d-flex flex-row justify-content-between">
        <div class="h3">
          <span *ngIf="!activeInvoice?.id">Create new invoice</span>
          <strong *ngIf="activeInvoice?.id">
            Invoice<span class="badge badge-dark"># {{activeInvoice?.invoiceNumber}}</span>
          </strong>
          <button
            *ngIf="!isInvoicesPanelOpened"
            (click)="openInvoicesPanel.emit()"
            class="btn btn-sm btn-outline-primary">invoices</button>
        </div>
        <div class="h2">
          <button
            type="submit"
            class="btn btn-link"
            [disabled]="form.invalid"
          >
          <i
            [style.opacity]="form.valid ? 1 : 0.3"
            class="fas fa-save fa-2x"
          ></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <input
          class="form-control"
          [ngClass]="{
            'is-valid': form.get('subject').valid,
            'is-invalid': form.get('subject').invalid && form.touched
          }"
          type="text"
          placeholder="Invoice subject"
          formControlName="subject"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control"
          [ngClass]="{
            'is-valid': form.get('date').valid,
            'is-invalid': form.get('date').invalid && form.touched
          }"
          type="date"
          formControlName="date"
        >
      </div>

      <div class="form-goup form-inline">
        <select class="form-control mr-0 mr-sm-2">
          <option>Select a Client *</option>
          <option>2</option>
        </select>
        <button
          *ngIf="!isClientsPanelOpened"
          (click)="openClientsPanel.emit()"
          class="btn btn-sm btn-outline-primary mt-2 mt-sm-0">Edit Client</button>
      </div>


      <h4>Products</h4>
      <div
      formArrayName="items"
      *ngFor=" let item of items.controls; let i= index; let last= last;"
      >
        <div
        class="form-group form-inline"
        [formGroupName]="i"
        style="border-left: 5px solid grey; padding-left: 10px;"
        [style.border-color]="item.valid ? 'green' : 'red'"
        >
          <input
           formControlName="text"
           type="text"
           class="form-control mr-sm-2 mb-1 mb-sm-0"
           placeholder="Item description*"
          >
          <input
           formControlName="price"
           type="number"
           class="form-control mr-sm-2 mb-1 mb-sm-0"
           placeholder="Price*"
          >
          <i class="far fa-plus-square ml-2 mr-2"
              (click)="addItem()"
              *ngIf="item.valid && last"
          ></i>
          <i class="far fa-trash-alt ml-2 mr-2"
             (click)="deleteItem(item)"
             *ngIf="items.controls.length > 1"
          ></i>
        </div>
        </div>

        <hr>
        <h5>{{getTotal() | currency}}</h5>
    </form>
  `,
  styles: []
})
export class InvoiceFormComponent implements OnChanges {
  @Input() activeInvoice: Invoice;
  @Input() isInvoicesPanelOpened: boolean;
  @Input() isClientsPanelOpened: boolean;
  @Output() saveInvoice: EventEmitter<Partial<Invoice>> = new EventEmitter<Partial<Invoice>>();
  @Output() openInvoicesPanel: EventEmitter<void> = new EventEmitter<void>();
  @Output() openClientsPanel: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  items: FormArray;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      subject: [null, Validators.required],
      date: [null, Validators.required],
      items: fb.array([])
    });
    this.items = this.form.get('items') as FormArray;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeInvoice) {
      const {activeInvoice: {currentValue}} = changes;
      if (currentValue) {
        this.updateInvoice(currentValue);
      } else {
        this.createNew();
      }
    }
  }

  updateInvoice(currentInvoice: Invoice) {
    this.items.
    if (currentInvoice.items.length) {
      currentInvoice.items.forEach(item => this.addItem(item));
    }
    this.form.patchValue(currentInvoice);
  }

  createNew() {
    this.items.clear();
    this.form.reset();
    this.addItem();
  }

  saveHandler() {
    const formData = {
      ...this.form.value,
      total: this.getTotal()
    };
    this.saveInvoice.emit(formData);
  }

  addItem(item: InvoiceItem = {text: null, price: null}) {
    this.items.push(this.fb.group({
      text: [item.text, Validators.required],
      price: [item.price, Validators.required],
    }));
  }

  deleteItem(item: AbstractControl) {
    const index = this.items.controls.indexOf(item);
    this.items.removeAt(index);
  }

  getTotal() {
    return this.items.controls.reduce((acc: number, curr: FormGroup) => {
      return acc + +curr.controls.price.value;
    }, 0);
  }


}
