import { Directive, ElementRef, Input, OnInit, ViewContainerRef } from "@angular/core";
import { AutocompleteComponent } from "./autocomplete.component";
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { NgControl } from "@angular/forms";
import { fromEvent } from "rxjs";
import { TemplatePortal } from "@angular/cdk/portal";
import { filter, takeUntil } from 'rxjs/operators';


@Directive({
    selector: '[ngAutoComplete]'
})
export class NgAutoDirective implements OnInit {
    @Input() ngAutoComplete: AutocompleteComponent;
    private overlayRef: OverlayRef;

    constructor(
        private inputRef: ElementRef<HTMLInputElement>,
        private ngControl: NgControl,
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay
    ) { }

    get control() {
        return this.ngControl.control;
    }

    get origin() {
        return this.inputRef.nativeElement;
    }

    private overlayPosition() {
        return this.overlay.position()
            .flexibleConnectedTo(this.origin)
            .withPositions([
                new ConnectionPositionPair(
                    { originX: 'start', originY: 'bottom' },
                    { overlayX: 'start', overlayY: 'top' }),
                new ConnectionPositionPair(
                    { originX: 'start', originY: 'top' },
                    { overlayX: 'start', overlayY: 'bottom' }
                )])
            .withFlexibleDimensions(false)
            .withPush(false);
    }

    private close() {
        this.overlayRef.detach();
        this.overlayRef = null;
    }

    openResultComponent() {
        this.overlayRef = this.overlay.create({
            width: this.origin.offsetWidth,
            maxHeight: 40 * 3,
            backdropClass: '',
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            positionStrategy: this.overlayPosition()
        });
        const templatePortal = new TemplatePortal(this.ngAutoComplete.rootTemplate, this.viewContainerRef);
        this.overlayRef.attach(templatePortal);
        closeOverlayWhenClickOutside(this.overlayRef, this.origin).subscribe(() => this.close());
    }

    ngOnInit(): void {
        fromEvent(this.origin, 'focus')
            .subscribe(() => {
                this.openResultComponent();
                this.ngAutoComplete.optionIsClicked()
                    .pipe(takeUntil(this.overlayRef.detachments()))
                    .subscribe((value: string) => {
                        this.control.setValue(value);
                        this.close();
                    });
            });
    }
}

export function closeOverlayWhenClickOutside(overlayRef: OverlayRef, origin: HTMLElement) {
    return fromEvent<MouseEvent>(document, 'click')
        .pipe(filter(event => {
            const clickTarget = event.target as HTMLElement;
            const notOrigin = clickTarget !== origin;
            const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false);
            return notOrigin && notOverlay;
        }), takeUntil(overlayRef.detachments()));
}
