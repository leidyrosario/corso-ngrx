import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClientService } from "./../../services/clients.service";
import * as ClientsActions from '../actions/clients.actions';
import { mergeMap, catchError, map } from "rxjs/operators";
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientEffects {
    loadClient$ = createEffect(() => this.actions$.pipe(
        ofType(ClientsActions.loadClients),
        mergeMap((action) => this.clientService.loadClients()
            .pipe(
                map(result => ClientsActions.loadClientSuccess({clients: result})),
                catchError(() => of(ClientsActions.loadClientFailed()))
            )
        )
    ));

    addClient$ = createEffect(() => this.actions$.pipe(
        ofType(ClientsActions.addClient),
        mergeMap((action) => this.clientService.addClient(action.client)
            .pipe(
                map(result => ClientsActions.addClientSuccess({client: result})),
                catchError(() => of(ClientsActions.addClientFailed()))
            )
        )
    ));

    editClient$ = createEffect(() => this.actions$.pipe(
        ofType(ClientsActions.editClient),
        mergeMap((action) => this.clientService.editClient(action.client)
            .pipe(
                map(result => ClientsActions.editClientSuccess({client: result})),
                catchError(() => of(ClientsActions.editClientFailed()))
            )
        )
    ));


    constructor(
        private actions$: Actions,
        private clientService: ClientService
    ) {}
}
