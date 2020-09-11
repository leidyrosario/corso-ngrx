import * as AuthActions from "./../../core/auth/store/auth.actions";
import { AppState } from "./../../core/core.module";
import * as RouterActions from './../../core/router/store/router.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  template: `
    <form
    #f="ngForm"
    (ngSubmit)="login(f.value)"
    class="container"
    style="max-width: 400px"
    >
      <div class="form-group">
        <input
        placeholder="email"
        type="text" [ngModel] class="form-control" required name="email">
      </div>
      <div class="form-group">
        <input
        placeholder="password"
        type="password" [ngModel] class="form-control" required name="password">
      </div>
      <button type="login()" class="btn btn-primary btn-block btn-lg">LOGIN</button>
    </form>

  `,
  styles: []
})
export class LoginComponent {

  constructor(private store: Store<AppState>) { }

  go() {
     // this.store.dispatch(RouterActions.go({ path: ['home']}));
    // this.store.dispatch(RouterActions.back());
  }

  login(formData: any) {
    const { email, password} = formData;
    this.store.dispatch(AuthActions.login({email, password}));
  }

}
