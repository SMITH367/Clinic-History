import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesManagerComponent } from './classes-manager.component';

describe('ClassesManagerComponent', () => {
  let component: ClassesManagerComponent;
  let fixture: ComponentFixture<ClassesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
