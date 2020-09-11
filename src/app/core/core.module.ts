import { AuthInterceptor } from "./auth/services/auth.interceptor";
import { ProfileEffects } from './profile/store/profile.effects';
import { ProfileService } from './profile/services/profile.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule, RouterState, RouterReducerState } from "@ngrx/router-store";
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router/store/router.effects';
import {  ProfileState, reducer as profileReducer } from "./profile/store/profile.reducer";
import { AuthService } from './auth/services/auth.service';
import { AuthEffects } from './auth/store/auth.effects';
import { reducer as authReducer, AuthState } from './auth/store/auth.reducer';
import { AuthGuard } from './auth/services/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  router: RouterReducerState;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {
        auth: authReducer,
        profile: profileReducer,
        router: routerReducer
      },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictStateSerializability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot([
      RouterEffects,
      ProfileEffects,
      AuthEffects
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ProfileService
  ]
})
export class CoreModule { }
