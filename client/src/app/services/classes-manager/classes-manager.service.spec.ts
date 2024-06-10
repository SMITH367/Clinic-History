import { TestBed } from '@angular/core/testing';

import { ClassesManagerService } from './classes-manager.service';

describe('ClassesManagerService', () => {
  let service: ClassesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
