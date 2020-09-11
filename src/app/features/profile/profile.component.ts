import { getProfileUserName, getProfile } from "./../../core/profile/store/profile.selectors";
import { AppState } from "./../../core/core.module";
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ProfileActions from 'src/app/core/profile/store/profile.actions';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile',
  template: `
    <div *ngIf="(profile$ | async).error" class="alert alert-danger">
    errore server side
    </div>
    <form
    class="container"
    style=" max-width: 400px;"
    #f="ngForm"
    *ngIf="(profile$ | async) as profile"
    (ngSubmit)="save(f.value)"
    >
    <h2>Your Profile</h2>
    <div class="form-group">
      <input
      class="form-control"
      required
      type="text" [ngModel]="profile.user.name"
      name="name">
    </div>
    <div class="form-group">
      <input
      class="form-control"
      required
      type="text" [ngModel]="profile.user.email"
      name="email">
    </div>
      <button type="submit" class="btn btn-lg btn-block btn-primary" [disabled]="f.invalid">SAVE</button>

    </form>

  `,
  styles: []
})
export class ProfileComponent {
  profile$ = this.store.pipe(select(getProfile));

  constructor(private store: Store<AppState>) {
    store.dispatch(ProfileActions.loadProfile());
  }

  save(user: Partial<User>) {
    this.store.dispatch(ProfileActions.editProfile({user}));
  }

}
