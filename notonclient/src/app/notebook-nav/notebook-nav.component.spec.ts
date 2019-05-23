import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookNavComponent } from './notebook-nav.component';

describe('NotebookNavComponent', () => {
  let component: NotebookNavComponent;
  let fixture: ComponentFixture<NotebookNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebookNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
