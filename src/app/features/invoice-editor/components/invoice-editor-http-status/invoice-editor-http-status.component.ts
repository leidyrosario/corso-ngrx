import { HttpStatus } from "src/app/model/http.status";
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-invoice-editor-http-status',
    template: `
    <div
    class="alert"
    [ngClass]="{
        'alert-danger': status.type === 'failed',
        'alert-success': status.type === 'success'
    }"
    >
      <div [ngSwitch]="status.reason">
        <div *ngSwitchCase="'loadClientFailed'"> Caricamento clienti fallito</div>
        <div *ngSwitchCase="'addClientFailed'"> Add client fallito</div>
        <div *ngSwitchCase="'editClientFailed'"> Edit client fallito</div>

        <div *ngSwitchCase="'addClientSuccess'"> Ok cliente inserito!</div>
        <div *ngSwitchCase="'editClientSuccess'"> Ok cliente modificato!</div>
      </div>
    </div>
    `
})
export class InvoiceEditorHttpStatusComponent {
    @Input() status: HttpStatus;
}
