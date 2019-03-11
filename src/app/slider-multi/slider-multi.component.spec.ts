import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMultiComponent } from './slider-multi.component';

describe('SliderMultiComponent', () => {
  let component: SliderMultiComponent;
  let fixture: ComponentFixture<SliderMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
