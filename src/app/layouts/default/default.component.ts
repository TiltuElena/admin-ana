import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { BodyComponent } from '../../components/layout/body/body.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { SideNavToggle } from '../../shared/interfaces';
import { ConfirmDialogComponent } from '../../components/layout/confirm-dialog/confirm-dialog.component';
import {Unsubscribe} from '../../shared/classes/unsubscribe';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NgClass,
    BodyComponent,
    ScrollPanelModule,
    ConfirmDialogComponent
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent extends Unsubscribe{
  isSideNavCollapsed = false;
  screenWidth = 0;
  constructor(private router: Router) {
    super();
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll the app-body to the top on route change
        const bodyElement = document.querySelector('app-body');
        if (bodyElement) {
          bodyElement.scrollTop = 0;
        }
      }
    });
  }
}
