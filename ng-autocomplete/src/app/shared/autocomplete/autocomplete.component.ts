import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, ContentChild, ContentChildren, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { merge } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { NgAutoContentDirective } from './autocomplete-content.directive';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'ngAutoComplete'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('root') rootTemplate: TemplateRef<any>;

  @ContentChild(NgAutoContentDirective)
  content: NgAutoContentDirective;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  optionIsClicked() {
    return this.options.changes
      .pipe(
        switchMap(options => {
          const click$ = options.map(option => option.click$);
          return merge(...click$);
        })
      )
  }

  constructor() { }

  ngOnInit(): void {
  }

}
