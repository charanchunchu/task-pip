import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckoutDialogComponent } from './order-checkout-dialog.component';

describe('OrderCheckoutDialogComponent', () => {
  let component: OrderCheckoutDialogComponent;
  let fixture: ComponentFixture<OrderCheckoutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCheckoutDialogComponent]
    });
    fixture = TestBed.createComponent(OrderCheckoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
