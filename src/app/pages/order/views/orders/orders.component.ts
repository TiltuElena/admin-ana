import { Component, ViewChild } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService, PrimeTemplate, SortEvent } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { BehaviorSubject } from 'rxjs';
import { OrdersService } from '../../../../api/modules/orders.service';

import { ChipModule } from 'primeng/chip';
import { Router } from '@angular/router';
import { PageRoutes } from '../../../../shared/enums';
import { CardModule } from 'primeng/card';
import { BaseChartDirective } from 'ng2-charts';
import { OrdersOverviewComponent } from './components/orders-overview/orders-overview.component';
import { ConfirmationDialogService } from '../../../../services/confirmation-dialog/confirmation-dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import {MdlCurrencyPipe} from '../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    PrimeTemplate,
    TableModule,
    TagModule,
    CommonModule,
    FormsModule,
    Button,
    ButtonDirective,
    Ripple,
    MdlCurrencyPipe,
    ChipModule,
    CardModule,
    BaseChartDirective,
    OrdersOverviewComponent,
    TranslateModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  @ViewChild('dt') dt!: Table;
  loading = false;
  isSorted: any = null;
  initialValue: any;
  orders$: BehaviorSubject<any> = new BehaviorSubject([]);
  currentOrder$: BehaviorSubject<any> = new BehaviorSubject([]);
  // orderDialog = false;

  constructor(
    private orderService: OrdersService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService
  ) {
    // this.orders$ = this.orderDataService.orders$;
    // this.currentOrder$ = this.orderDataService.currentOrder$;
  }

  ngOnInit() {
    // this.orderService.getOrders().then((orders) => {
    //   this.orders$.next(orders);
    //   this.loading = false;
    //   this.initialValue = [...orders];
    // });

    this.orderService.getAll().subscribe((orders: any) => {
      console.log(orders.data);
      this.orders$.next(orders.data);
      this.initialValue = [...orders.data];
    })
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.orders$.next([...this.initialValue]);
      this.dt.reset();
    }
  }

  sortTableData(event: any) {
    event.data.sort((data1: any, data2: any) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  openNew() {
    // this.currentOrder$.next({
    //   user: {},
    // });
    // this.orderDialog = true;
    this.router.navigate([`${PageRoutes.Orders}/create`]).then();
  }

  editCustomer(order: any) {
    this.currentOrder$.next({ ...order });
    this.router.navigate([`${PageRoutes.Orders}/${order.id}`]).then();
    // this.orderDialog = true;
  }

  deleteCustomer(order: any) {
    this.confirmationDialogService.confirm(
      'Are you sure you want to delete',
      `order with id ${order.id}?`,
      () => {
        console.log('Order deleted:', order);
        const result = this.orders$
          .getValue()
          .filter((val: any) => val.id !== order.id);
        this.orders$.next(result);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Order ${order.id} successfully deleted!`,
          life: 3000,
        });
      },
      () => {
        console.log('Order deletion canceled');
      }
    );
    // console.log('delete order ', order.name);
    // const result = this.orders$
    //   .getValue()
    //   .filter((val: any) => val.id !== order.id);
    // this.orders$.next(result);
  }

  // handleState(data: any) {
  //   this.orderDialog = data;
  // }

  statusOptions = [
    { label: 'New', value: 'new' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Rejected', value: 'rejected' },
  ];

  getSeverity(status: string) {
    // return this.orderDataService.getSeverity(status);
    switch (status) {
      case 'NEW':
        return 'warning';
      case 'REJECTED':
        return 'danger';
      case 'CONFIRMED':
        return 'success';
      default:
        return 'info';
    }
  }
}
