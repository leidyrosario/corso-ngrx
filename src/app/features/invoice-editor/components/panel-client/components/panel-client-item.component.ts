import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-panel-client-item',
  template: `
    <div (click)="editHandler()">
        <div *ngIf="!isEditing">{{client.name}}</div>
          <div *ngIf="isEditing" class="form-inline">
            <input
            type="text"
            class="form-control"
            [ngModel]="client.name"
            #name
            (keyup.enter)="confirmHandler(name.value)"
            >
            <i class="fa fa-check-circle ml-1 mr-1" (click)="confirmHandler(name.value, $event)"></i>
            <i class="fa fa-times mr-1" (click)="cancelHandler($event)"></i>
          </div>
        </div>
  `,
  styles: []
})
export class PanelClientItemComponent {
  @Input() client: Client;
  @Output() editClient: EventEmitter<Client> = new EventEmitter<any>();
  @HostBinding() className = 'list-group-item';
  isEditing = false;

  editHandler() {
    this.isEditing = true;
  }

  cancelHandler(event: MouseEvent) {
    event.stopPropagation();
    this.isEditing = false;
  }

  confirmHandler(name: string, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    const client: Client = {...this.client, name};
    this.editClient.emit(client);
    this.isEditing = false;
  }

}
