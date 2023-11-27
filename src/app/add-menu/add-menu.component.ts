import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';

interface MenuItem {
  title: string;
  item: string;
  price: string;
  description: string;
  calories: string;
  type: string;
}

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent {

  title = '';
  item = '';
  price = '';
  description = '';
  calories = '';
  type = '';

  constructor(private service: ServiceService) {}

  onSubmit() {
    const newMenuItem: MenuItem = {
      title: this.title,
      item: this.item,
      price: this.price,
      description: this.description,
      calories: this.calories,
      type: this.type
    };

    this.service.addMenuItem(newMenuItem).subscribe(
      (response) => {
      },
      (error) => {
      }
    );
  }

}
