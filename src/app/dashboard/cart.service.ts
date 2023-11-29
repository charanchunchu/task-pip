import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartItemsFromLocalStorage();
  }

  addToCart(item: any, quantity: number) {
    const cartItems = this.cartItemsSubject.value;
    const existingItem = cartItems.find((cartItem) => cartItem.item.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ item, quantity });
    }

    this.cartItemsSubject.next([...cartItems]);
    this.saveCartItemsToLocalStorage(cartItems);
  }

  removeFromCart(itemId: number) {
    const cartItems = this.cartItemsSubject.value.filter((cartItem) => cartItem.item.id !== itemId);
    this.cartItemsSubject.next([...cartItems]);
    this.saveCartItemsToLocalStorage(cartItems);
  }

  loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItemsSubject.next(JSON.parse(storedCartItems));
    }
  }

  private saveCartItemsToLocalStorage(cartItems: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}
