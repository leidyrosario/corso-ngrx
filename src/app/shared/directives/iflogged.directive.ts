import { map, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { getToken } from "./../../core/auth/store/auth.selectors";
import { AppState } from "./../../core/core.module";
import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';

@Directive({
    selector: '[appIfLogged]'
})
export class IfLoggedDirective implements OnInit, OnDestroy {
private destroy$ = new Subject();
    constructor(
        private template: TemplateRef<any>,
        private view: ViewContainerRef,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.store
            .pipe(
                select(getToken),
                map(token => !!token),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(isLogged => {
                if (isLogged) {
                    this.view.createEmbeddedView(this.template);
                } else {
                    this.view.clear();
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
