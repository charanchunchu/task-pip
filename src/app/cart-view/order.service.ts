import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private tableNumber: number | null = null;
  private orderReceived: boolean = false;

  setTableNumber(tableNumber: number): void {
    this.tableNumber = tableNumber;
  }

  markOrderReceived(): void {
    this.orderReceived = true;
  }

  getTableNumber(): number | null {
    return this.tableNumber;
  }

  isOrderReceived(): boolean {
    return this.orderReceived;
  }
}
