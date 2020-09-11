import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfLoggedDirective } from './directives/iflogged.directive';

@NgModule({
  declarations: [
    IfLoggedDirective
  ],
  exports: [
    IfLoggedDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
 }
