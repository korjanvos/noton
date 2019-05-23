import { TestBed } from '@angular/core/testing';

import { NotebookService } from './notebook.service';

describe('NotebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotebookService = TestBed.get(NotebookService);
    expect(service).toBeTruthy();
  });
});
