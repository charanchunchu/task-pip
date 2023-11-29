import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-checkout-dialog',
  templateUrl: './order-checkout-dialog.component.html',
  styleUrls: ['./order-checkout-dialog.component.scss']
})
export class OrderCheckoutDialogComponent {
  constructor(private router: Router,
    public dialogRef: MatDialogRef<OrderCheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  orders(){
    this.router.navigate(['dashboard']);
    this.dialogRef.close()
  }
}
