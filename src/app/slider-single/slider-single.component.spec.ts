import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSingleComponent } from './slider-single.component';

describe('SliderSingleComponent', () => {
  let component: SliderSingleComponent;
  let fixture: ComponentFixture<SliderSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
