import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalDataService} from '../../shared/services/global-data.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'fas fa-tv', class: ''},
  {path: '/settings', title: 'Settings', icon: 'fas fa-cogs', class: ''},
  {path: '/notifications', title: 'Notifications', icon: 'far fa-bell', class: ''},
  {path: '/users', title: 'Customers', icon: 'fas fa-users', class: ''},
  {path: '/products', title: 'Products', icon: 'fab fa-product-hunt', class: ''},
  {path: '/categories', title: 'Categories', icon: 'fas fa-th-list', class: ''},
  {path: '/sub-categories', title: 'Sub Categories', icon: 'fas fa-stream', class: ''},
  {path: '/tags', title: 'Tags', icon: 'fas fa-tags', class: ''},
  {path: '/invoices', title: 'Invoices', icon: 'fas fa-file-invoice', class: ''},
  {path: '/payments', title: 'Payments', icon: 'fab fa-paypal', class: ''},
  {path: '/orders', title: 'Orders', icon: 'far fa-dot-circle', class: ''},

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
              public gdService: GlobalDataService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
