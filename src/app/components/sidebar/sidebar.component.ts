import { Component, OnInit } from '@angular/core';
import {UserComponent} from '../../user/user.component'
import { AuthService } from 'src/app/service/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/addsensor', title: 'AddSensor', icon: 'add', class: ''},
    { path: '/user', title: 'User',  icon:'person', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public authService: AuthService,
    private location : Location,
    private router: Router
    ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
    console.log("logout")
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/user']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
