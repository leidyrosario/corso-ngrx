import * as UiActions from "./../actions/ui.actions";
import { ClientService } from "./../../services/clients.service";
import { switchMap } from "rxjs/operators";
import * as InvoiceEditorActions from "./../actions/invoices-editor.actions";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { InvoicesService } from '../../services/invoices.service';
import { Client } from 'src/app/model/client';
import { Invoice } from 'src/app/model/invoice';

@Injectable()
export class InvoicesEditorEffects {
    initEditor$ = createEffect(() => this.actions$.pipe(
        ofType(InvoiceEditorActions.initInvoicesEditor),
        switchMap(
            () => forkJoin([
            this.invoicesService.loadInvoices(),
            this.clientService.loadClients()
        ])
            .pipe(
                switchMap((result: [Invoice[], Client[]]) => {
                    return [
                        InvoiceEditorActions.initInvoicesEditorSuccess({
                            invoices: result[0],
                            clients: result[1]
                        }),
                        // UiActions.openInvoicePanel()
                    ];
                })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private clientService: ClientService,
        private invoicesService: InvoicesService
        ) {}
}
