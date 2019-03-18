import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPrescriptionComponent } from './upload-prescription.component';

describe('UploadPrescriptionComponent', () => {
  let component: UploadPrescriptionComponent;
  let fixture: ComponentFixture<UploadPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
