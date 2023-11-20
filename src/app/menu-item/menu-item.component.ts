import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  menuData: any[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.loadmenuData();
  }

  loadmenuData() {
    this.service.getMenuItems().subscribe((data) => {
      this.menuData = data;
    });
  }
}
