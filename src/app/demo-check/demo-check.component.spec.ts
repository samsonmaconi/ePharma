import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCheckComponent } from './demo-check.component';

describe('DemoCheckComponent', () => {
  let component: DemoCheckComponent;
  let fixture: ComponentFixture<DemoCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
