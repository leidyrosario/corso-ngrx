import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-panel-client-header',
  template: `
    <div class="row">
        <div class="col-8">
          <div class="h3" *ngIf="!isAdding">
            <i class="fa fa-plus-circle mr-1"
                (click)="addHandler()"></i>
            CLIENTS
          </div>

          <div *ngIf="isAdding" class="form-inline">
            <input
            type="text"
            class="form-control"
            [(ngModel)]="clientName"
            (keyup.enter)="confirmHandler()"
            #input>
            <i class="fa fa-check-circle ml-1 mr-1" (click)="confirmHandler()"></i>
            <i class="fa fa-times mr-1" (click)="cancelHandler()" ></i>
          </div>
        </div>

        <div class="col-4 text-right h3" (click)="closePanel.emit()">
          <i class=" fa fa-times"></i>
        </div>
      </div>
  `,
  styles: []
})
export class PanelClientHeaderComponent {
  @Output() addClient: EventEmitter<Client> = new EventEmitter<any>();
  @Output() closePanel: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  isAdding = false;
  clientName: string;


  constructor(private cd: ChangeDetectorRef) { }

  confirmHandler() {
    this.addClient.emit({name: this.clientName});
    this.isAdding = false;
  }

  cancelHandler() {
    this.isAdding = false;
  }

  addHandler() {
    this.isAdding = true;
    this.clientName = null;
    this.cd.detectChanges();
    this.input.nativeElement.focus();
  }

}
