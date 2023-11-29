import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(cartItems);
      return cartItems;
    } else {
      return [];
    }
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
    this.saveCartItemsToLocalStorage();
  }

  removeFromCart(itemId: number) {
    const cartItems = this.cartItemsSubject.value.filter((cartItem) => cartItem.item.id !== itemId);
    this.cartItemsSubject.next([...cartItems]);
    this.saveCartItemsToLocalStorage();
  }

  private saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.value));
  }
}
