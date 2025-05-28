import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SideNavToggle } from '../../../shared/interfaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgClass, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})

export class SidebarComponent {
  @Output() toggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 768) {
      this.collapsed = false;
      this.toggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  collapsed = false;
  screenWidth = 0;

  sidebarData = [
    {
      routeLink: 'dashboard',
      icon: 'pi pi-objects-column',
      label: 'Dashboard',
    },
    {
      routeLink: 'booking',
      icon: 'pi pi-wrench',
      label: 'Booking',
    },
    {
      routeLink: 'customers',
      icon: 'pi pi-users',
      label: 'Customers',
    },
    {
      routeLink: 'orders',
      icon: 'pi pi-receipt',
      label: 'Orders',
    },
    {
      routeLink: 'settings',
      icon: 'pi pi-cog',
      label: 'Settings',
    },
  ];

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.toggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav() {
    this.collapsed = false;
    this.toggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }
}
