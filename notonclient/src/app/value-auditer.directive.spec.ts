import { ValueAuditerDirective } from './value-auditer.directive';
import { ElementRef } from "@angular/core";
import anything = jasmine.anything;

describe('ValueAuditerDirective', () => {
  it('should create an instance', () => {
    const directive = new ValueAuditerDirective(new ElementRef(anything));
    expect(directive).toBeTruthy();
  });
});
