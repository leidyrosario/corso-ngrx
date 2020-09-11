import { Client } from "src/app/model/client";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel-client',
  template: `
    <div
    class="sidepanel sidepanel-right"
    [ngClass]="{'sidepanel-right-hide': !show}"
    >
      <app-panel-client-header
      (addClient)="addClient.emit($event)"
      (closePanel)="closePanel.emit()"
      >
      </app-panel-client-header>

      <div class="list-group">
      <small class="text-center">Click to edit</small>

      <app-panel-client-item
      *ngFor="let client of clients"
      [client]="client"
      (editClient)="editClient.emit($event)"></app-panel-client-item>

      </div>
    </div>
  `,
  styleUrls: ['./panel-client.component.css']
})
export class PanelClientComponent {

  @Input() show: boolean;
  @Input() clients: Client[];
  @Output() addClient: EventEmitter<Client> = new EventEmitter<any>();
  @Output() editClient: EventEmitter<Client> = new EventEmitter<any>();
  @Output() closePanel: EventEmitter<any> = new EventEmitter<any>();


}
