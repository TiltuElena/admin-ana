import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { PageRoutes } from '../../../../shared/enums';
import { TranslateModule } from '@ngx-translate/core';
import { OrdersService } from '../../../../api/modules/orders.service';
import { DatePipe } from '@angular/common';
import {MdlCurrencyPipe} from '../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [
    ButtonDirective,
    CardModule,
    DividerModule,
    MdlCurrencyPipe,
    PrimeTemplate,
    Ripple,
    TableModule,
    TagModule,
    TranslateModule,
    DatePipe,
  ],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
})
export class OrdersTableComponent {
  constructor(private router: Router, private ordersService: OrdersService) {}
  orders = [];
  ngOnInit() {
    this.ordersService.getRecent().subscribe((orders: any) => {
      this.orders = orders.data;
    });
  }
  // orders: any[] = [
  //   {
  //     id: '1000',
  //     customerName: 'Fabio Lorenzo',
  //     date: '3 Aug',
  //     totalCost: 65,
  //     nrOfWorkplaces: 2,
  //     orderStatus: 'NEW',
  //     dateFrom: '02-08-24',
  //     dateTo: '10-09-24',
  //   },
  //   {
  //     id: '1001',
  //     customerName: 'Fabio Lorenzo',
  //     date: '3 Aug',
  //     totalCost: 72,
  //     nrOfWorkplaces: 1,
  //     orderStatus: 'REJECTED',
  //     dateFrom: '02-08-24',
  //     dateTo: '10-09-24',
  //   },
  //   {
  //     id: '1002',
  //     customerName: 'Bell Covely',
  //     date: '3 Aug',
  //     totalCost: 79,
  //     nrOfWorkplaces: 2,
  //     orderStatus: 'NEW',
  //     dateFrom: '02-08-24',
  //     dateTo: '10-09-24',
  //   },
  //   {
  //     id: '1003',
  //     customerName: 'Bell Covely',
  //     date: '4 Aug',
  //     totalCost: 3496,
  //     nrOfWorkplaces: 6,
  //     orderStatus: 'CONFIRMED',
  //     dateFrom: '02-08-24',
  //     dateTo: '10-09-24',
  //   },
  //   {
  //     id: '1004',
  //     customerName: 'Bell Covely',
  //     date: '5 Aug',
  //     totalCost: 4556,
  //     nrOfWorkplaces: 4,
  //     orderStatus: 'CONFIRMED',
  //     dateFrom: '02-08-24',
  //     dateTo: '10-09-24',
  //   },
  // ];

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'CONFIRMED':
  //       return 'success';
  //     case 'NEW':
  //       return 'warning';
  //     case 'REJECTED':
  //       return 'danger';
  //     default:
  //       return 'info';
  //   }
  // }

  getSeverity(status: string) {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'success';
      case 'NEW':
        return 'warning';
      case 'REJECTED':
        return 'danger';
      default:
        return 'info';
    }
  }

  redirectToOrders() {
    this.router.navigate([PageRoutes.Orders]).then();
  }
}
