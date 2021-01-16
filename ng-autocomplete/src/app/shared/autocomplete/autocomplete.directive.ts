import { Directive, Input, OnInit } from "@angular/core";
import { AutocompleteComponent } from "./autocomplete.component";

@Directive({
    selector: '[ngauto], ngauto'
})
export class NgAutoDirective implements OnInit {
    @Input() ngAuto: AutocompleteComponent;
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}
