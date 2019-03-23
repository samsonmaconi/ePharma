import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemsComponent } from './orderitems.component';

describe('OrderitemsComponent', () => {
  let component: OrderitemsComponent;
  let fixture: ComponentFixture<OrderitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
