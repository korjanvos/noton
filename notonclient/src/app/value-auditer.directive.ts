import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Subject } from "rxjs";
import { auditTime, distinctUntilChanged } from "rxjs/operators";

@Directive({
  selector: '[appValueAuditor]'
})
export class ValueAuditerDirective implements OnInit{
  private potentialNewValue = new Subject<any>();

  @HostListener('input') onInput() {
    this.potentialNewValue.next(this.el.nativeElement.value);
  }

  @Output('newValue') newValueEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.potentialNewValue.pipe(
      auditTime(5000),
      distinctUntilChanged()
    ).subscribe(newValue => this.newValueEmitter.emit(newValue));
  }
}
