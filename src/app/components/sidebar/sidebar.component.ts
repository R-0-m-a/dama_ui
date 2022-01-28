import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {UtilitiesService} from "../../service/utilities.service";

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  role: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard/earrings', title: 'Earrings', icon: 'auto_awesome', class: '', role: ''},
  {path: '/dashboard/earringDetails', title: 'Earring Details', icon: 'format_list_bulleted', class: '', role: 'ROLE_ADMIN'},
  // {path: '/uploadImages', title: 'Images', icon: 'collections', class: ''},
  {path: '/dashboard/priceConfig', title: 'Price config', icon: 'euro', class: '', role: 'ROLE_ADMIN'},
  // {path: '/docs', title: 'Server Api', icon: 'api', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[] | undefined;
  logoUrl = environment.logoUrl;

  constructor(public utilities: UtilitiesService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    return $(window).width() <= 991;
  };
}
