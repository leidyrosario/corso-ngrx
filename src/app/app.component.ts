import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <hr>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'ngrx-invoice';
}
