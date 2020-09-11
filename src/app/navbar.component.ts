import { AppState } from "./core/core.module";
import { getProfileUserName } from "./core/profile/store/profile.selectors";
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AuthActions from './core/auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  template: `
  <div *appIfLogged class="sticky-top bg-primary text-white">
    <div class="d-flex flex-row justify-content-end pt-3 pb-3">
    <h4 *appIfLogged class="mr-4">{{username$ | async}}</h4>
      <div *appIfLogged routerLink="/profile" class="pr-2 pl-2" routerLinkActive="text-dark">
      <i class="fas fa-2x fa-user-circle"></i>
      </div>
      <div routerLink="/home" class="pr-2 pl-2" routerLinkActive="text-dark">
      <i class="fas fa-2x fa-home"></i>
      </div>
      <div *appIfLogged routerLink="/invoice-editor" class="pr-2 pl-2" routerLinkActive="text-dark">
      <i class="fas fa-2x fa-receipt"></i>
      </div>
      <div *appIfLogged class="pr-2 pl-2" (click)="logout()">
      <i class="fas fa-2x fa-sign-out-alt"></i>
      </div>
    </div>
  </div>
  `,
})
export class NavbarComponent {
  username$ = this.store.pipe(select(getProfileUserName));

  constructor(private store: Store<AppState>) {

  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
