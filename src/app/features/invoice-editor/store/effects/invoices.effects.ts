import { InvoicesService } from "./../../services/invoices.service";
import { getActiveInvoice, getNextInvoiceNumber } from "./../selectors/invoices.selector";
import { AppState } from "./../../../../core/core.module";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as InvoicesActions from '../actions/invoices.actions';
import { mergeMap, withLatestFrom, map, switchMap, catchError, switchMapTo } from "rxjs/operators";
import { of } from 'rxjs';
import { Store, select } from "@ngrx/store";
import { Invoice } from 'src/app/model/invoice';
import { Injectable } from '@angular/core';
import * as UiActions from '../actions/ui.actions';

@Injectable()
export class InvoicesEffects {
    saveEffect$ = createEffect(() => this.actions$.pipe(
      ofType(InvoicesActions.saveInvoice),
      withLatestFrom(
        this.store.pipe(select(getActiveInvoice))
      ),
      mergeMap(([action, activeInvoice]: [{invoice: Partial<Invoice>}, Invoice]) => {
        if (activeInvoice && activeInvoice.id) {
          return of(InvoicesActions.editInvoice({invoice: {...action.invoice, id: activeInvoice.id}}));
        } else {
          return of(InvoicesActions.addInvoice({ invoice: action.invoice }));
        }
      })
    ));

    addEffect$ = createEffect(() => this.actions$.pipe(
      ofType(InvoicesActions.addInvoice),
      withLatestFrom(
        this.store.pipe(select(getNextInvoiceNumber))
      ),
      mergeMap(([action, invoiceNumber]) => this.invoicesService.addInvoice({...action.invoice, invoiceNumber})
        .pipe(
          switchMap((result: Invoice) => [
            InvoicesActions.addInvoiceSuccess({invoice: result}),
            UiActions.openInvoicePanel(),
            InvoicesActions.setActiveInvoice({id: result.id})
          ]),
          catchError(() => of(InvoicesActions.addInvoiceFailed()))
        ))
    ));

    editEffect$ = createEffect(() => this.actions$.pipe(
      ofType(InvoicesActions.editInvoice),
      mergeMap(({invoice}) => this.invoicesService.editInvoice(invoice)
        .pipe(
          switchMap((result: Partial<Invoice>) => [
            InvoicesActions.editInvoiceSuccess({ invoice: result }),
            UiActions.openInvoicePanel()
          ]),
          catchError(() => of(InvoicesActions.editInvoiceFailed()))
        ))
    ));

    deleteInvoice$ = createEffect(() => this.actions$.pipe(
      ofType(InvoicesActions.deleteInvoice),
      withLatestFrom(
        this.store.pipe(select(getActiveInvoice))
      ),
      mergeMap(([action, active]) => this.invoicesService.deleteInvoice(action.id)
        .pipe(
          switchMapTo(
            active && active.id === action.id ?
            [
            InvoicesActions.deleteInvoiceSuccess({id: action.id}),
            InvoicesActions.setActiveInvoice({id: null})
          ] : [
            InvoicesActions.deleteInvoiceSuccess({id: action.id})
          ]
          )
        )
      )
    ));


    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private invoicesService: InvoicesService
    ) {}
}
