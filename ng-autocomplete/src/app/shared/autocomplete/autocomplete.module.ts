import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { OptionComponent } from './option/option.component';
import { NgAutoDirective } from './autocomplete.directive';
import { NgAutoContentDirective } from './autocomplete-content.directive';
import { AutocompleteFilterPipe } from './autocomplete-filter.pipe';
import { OverlayModule } from '@angular/cdk/overlay';

const declarations = [
  AutocompleteComponent,
  NgAutoDirective,
  NgAutoContentDirective,
  OptionComponent,
  AutocompleteFilterPipe
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    OverlayModule
  ]
})
export class AutocompleteModule { }
