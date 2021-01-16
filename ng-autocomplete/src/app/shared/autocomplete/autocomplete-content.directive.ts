import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[ngAutoCompleteContent], ngAutoCompleteContent'
})
export class NgAutoContentDirective {
    constructor(public optns: TemplateRef<any>) { }
}