import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHistoryComponent } from './ClinicHistoryComponent';

describe('ClinicHistoryComponent', () => {
  let component: ClinicHistoryComponent;
  let fixture: ComponentFixture<ClinicHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
