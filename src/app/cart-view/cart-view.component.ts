import { Component, OnInit } from '@angular/core';
import { CartService } from '../dashboard/cart.service';
import { Router } from '@angular/router';
import { Observable, async, map, take } from 'rxjs';
import { CartDataService } from '../shared/cart-data.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderCheckoutDialogComponent } from '../order-checkout-dialog/order-checkout-dialog.component';
import { OrderService } from './order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit{
  cartItems$: Observable<any[]>;
  constructor(public cartService: CartService, private router: Router, private cartDataService: CartDataService,  private orderService: OrderService,public dialog: MatDialog) {
    this.cartItems$ = this.cartService.cartItems$;
  }
  ngOnInit() {
    const loadedCartItems = this.cartDataService.loadCartItemsFromLocalStorage();
    if (loadedCartItems.length === 0) {
      this.cartService.cartItems$.subscribe((cartItems) => {
        this.cartItems$ = this.cartService.cartItems$;
      });
    } else {
      this.cartItems$ = this.cartDataService.cartItems$;
    }
  }
  back() {
    this.router.navigate(['dashboard']);
  }
  increaseQuantity(cartItem: any) {
    this.cartService.cartItems$.pipe(
      take(1),
      map((cartItems: any[]) => {
        return cartItems.map((item) => {
          if (item.item.id === cartItem.item.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      })
    ).subscribe(updatedCartItems => {
      this.cartService.addToCart(cartItem.item, 1);
    });
  }
  decreaseQuantity(cartItem: any) {
    this.cartService.cartItems$.pipe(
      take(1),
      map((cartItems: any[]) => {
        if (cartItem.quantity > 1) {
          return cartItems.map((item) => {
            if (item.item.id === cartItem.item.id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
        }
        return cartItems;
      })
    ).subscribe(updatedCartItems => {
      this.cartService.removeFromCart(cartItem.item.id);
    });
  }
  removeFromCart(cartItemId: number) {
    this.cartDataService.removeFromCart(cartItemId);
  }
  getTotalItemPrice(cartItems: any[]): number {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.item.Price;
    }, 0);
  }
  openCheckoutDialog(tableNumForm: NgForm): void {
    if (tableNumForm.invalid) {
      tableNumForm.controls['tableNum'].markAsTouched();
      return;
    }
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      const dialogRef = this.dialog.open(OrderCheckoutDialogComponent, {
        data: {
          orderService: this.orderService,
          cartItems: cartItems || [],
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }
}
