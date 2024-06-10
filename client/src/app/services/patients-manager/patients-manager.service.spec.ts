import { TestBed } from '@angular/core/testing';

import { PatientsManagerService } from './patients-manager.service';

describe('PatientsManagerService', () => {
  let service: PatientsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
