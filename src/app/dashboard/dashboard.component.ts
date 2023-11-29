import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../service/service.service';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { CreateEmployeeComponent } from '../customer/create-employee/create-employee.component';
import { ViewEmployeeComponent } from '../customer/view-employee/view-employee.component';
import { PeriodicElement } from './customer-interface';
import { CartDataService } from '../shared/cart-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cartItems: any[] = [];
  showCartView = false;
  quantities: number[] = [];
  clickedRowData: PeriodicElement;
  details: any[] = [];
  public userRole: string;
  filteredDetails: any[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: ServiceService,
    private cartService: CartService,
    private router: Router,
    private cartDataService: CartDataService,
  ) {}

  ngOnInit() {
    this.userRole = sessionStorage.getItem('userRole');
    this.loadQuantitiesFromLocalStorage();
    this.getMenuItems();
    this.cartDataService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  getMenuItems() {
    this.service.getMenuItems().subscribe(
      (data: any[]) => {
        this.details = data.map((item) => ({
          ...item,
          fileInputControl: this.sanitizeImagePath(item.fileInputControl),
        }));
        this.initializeQuantities();
      },
      (error) => {
        console.error('Error getting menu items:', error);
      }
    );
  }

  initializeQuantities() {
    if (!this.quantities || this.quantities.length !== this.details.length) {
      this.quantities = Array(this.details.length).fill(0);
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: '60%',
      width: '50%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getMenuItems();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!filterValue || filterValue === '') {
      this.getMenuItems();
    } else {
      this.details = this.details.filter((item) => {
        const concatenatedValues = Object.values(item)
          .filter((value) => typeof value === 'string' || typeof value === 'number')
          .map((value) => value.toString().toLowerCase())
          .join(' ');

        return concatenatedValues.includes(filterValue);
      });
    }
  }

  viewEmployee(row: PeriodicElement) {
    this.clickedRowData = row;
    const dialogRef = this.dialog.open(ViewEmployeeComponent, {
      data: this.clickedRowData,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.clickedRowData = null;
    });
  }

  editEmployee(row: PeriodicElement) {
    if (this.userRole === 'admin') {
      let dialogRef = this.dialog.open(CreateEmployeeComponent, {
        height: '60%',
        width: '50%',
        disableClose: true,
        data: row,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getMenuItems();
      });
    } else {
      this.snackBar.open("You don't have admin permissions", 'Close', {
        duration: 3000,
      });
    }
  }

  deleteEmployee(row: any) {
    if (this.userRole === 'admin') {
      this.service.deleteMenuItem(row['id']).subscribe(
        () => {
          this.getMenuItems();
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      this.snackBar.open("You don't have admin permissions", 'Close', {
        duration: 3000,
      });
    }
  }

  sanitizeImagePath(path: string): string {
    if (!path) {
      return path;
    }
    if (path.startsWith('C:\\fakepath\\')) {
      const fileExtension = path.split('.').pop().toLowerCase();
      if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExtension)) {
        const imageUrl = `assets/images/${path.replace('C:\\fakepath\\', '')}`;
        console.log('Generated Image URL:', imageUrl);
        return imageUrl;
      }
    } else if (path.startsWith('http')) {
      return path;
    }
    console.warn('Unrecognized file path format:', path);
    return path;
  }

  changeColor(type: any) {
    return type === 'veg';
  }

  increaseQuantity(index: number) {
    this.quantities[index]++;
    this.cartDataService.addToCart(this.details[index], 1);
  }

  decreaseQuantity(index: number) {
    if (this.quantities[index] > 0) {
      this.quantities[index]--;
      this.cartDataService.removeFromCart(this.details[index].id);
    }
  }

  addToCart(item: any) {
    const index = this.details.findIndex((element) => element.id === item.id);
    this.cartService.addToCart(this.details[index], this.quantities[index]);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item.id);
  }

  showCartButton(): boolean {
    return this.userRole === 'customer' && this.quantities.some(qty => qty > 0);
  }

  toggleCartView() {
    this.showCartView = !this.showCartView;
    this.router.navigate(['Cart']);
  }
  private loadQuantitiesFromLocalStorage() {
    const storedQuantities = localStorage.getItem('quantities');
    if (storedQuantities) {
      this.quantities = JSON.parse(storedQuantities);
    }
  }

  private saveQuantitiesToLocalStorage() {
    localStorage.setItem('quantities', JSON.stringify(this.quantities));
  }
  adjustQuantity(index: number, increment: number) {
    if (this.quantities[index] + increment >= 0) {
      this.quantities[index] += increment;
      if (increment > 0) {
        this.cartDataService.addToCart(this.details[index], 1);
      } else {
        this.cartDataService.removeFromCart(this.details[index].id);
      }
      this.saveQuantitiesToLocalStorage();
    }
  }
}
