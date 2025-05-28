import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { StepperModule } from 'primeng/stepper';
import { DialogComponent } from './components/dialog/dialog.component';
import { OrderDataService } from './services/order-data.service';
import { ConfirmationDialogService } from '../../../../services/confirmation-dialog/confirmation-dialog.service';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { OrdersService } from '../../../../api/modules/orders.service';
import { DatePipe } from '@angular/common';
import {MdlCurrencyPipe} from '../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    Ripple,
    CardModule,
    DividerModule,
    AvatarModule,
    TableModule,
    MdlCurrencyPipe,
    DropdownModule,
    FormsModule,
    TagModule,
    StepperModule,
    DialogComponent,
    DialogComponent,
    TranslateModule,
    DatePipe
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  orderDialog = false;
  orderData: any = {}
  defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s';
  totalBookingPrice = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderDataService: OrderDataService,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService,
    private ordersService: OrdersService
  ) {
    this.route.params.subscribe((params) => {
      this.ordersService.getById(params['id']).subscribe((data: any) => {
        this.orderData = data.data;
        this.orderDataService.currentOrder$.next({ ...data.data, payment_status: "paid" })
        this.totalBookingPrice = data.data.workplaces.reduce((total: number, current: any) => {
          return total + current.workplace.booking_price;
        }, 0);
      });
    });
  }

  // getOrderById(id: number) {
  //   console.log('get order ', id);
  //
  //   this.orderData = {
  //     id: id,
  //     username: 'Elena Tiltu',
  //     email: 'elenatiltu@gmail.com',
  //     phone: '039876654',
  //     status: 'New',
  //     payment_status: 'Paid',
  //     booked_from: '03/05/2025',
  //     booked_to: '12/05/2025',
  //   }
  // }

  navigateToOrders() {
    this.router.navigate(['/orders']).then();
  }

  statusOptions = [
    { label: 'New', value: 'new' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Rejected', value: 'rejected' },
  ];

  selectedStatus = this.statusOptions[0];

  // orderWorkplaces = [
  //   {
  //     id: 1,
  //     name: 'Workplace 1 of room 2',
  //     description: 'amazing',
  //     booking_price: 2005,
  //   },
  //   {
  //     id: 2,
  //     name: 'Workplace 2 of room 2',
  //     description: 'amazing',
  //     booking_price: 3495,
  //   },
  //   {
  //     id: 3,
  //     name: 'Workplace 1 of room 5',
  //     description: 'amazing',
  //     booking_price: 2005,
  //   },
  // ];

  getSeverity(status: string) {
    switch (status) {
      case 'new':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'confirmed':
        return 'success';
      default:
        return 'info';
    }
  }

  deleteOrder() {
    this.confirmationDialogService.confirm(
      'Are you sure you want to delete',
      `order with id ${this.orderData.id}?`,
      () => {
        console.log('Order deleted:', this.orderData);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Order ${this.orderData.id} successfully deleted!`,
          life: 3000,
        });

        this.router.navigate(['/orders']).then();
      },
      () => {
        console.log('Order deletion canceled');
      }
    );
  }

  markAsPaid() {
    this.confirmationDialogService.confirm(
      'Are you sure you want to mark',
      `order with id ${this.orderData.id} as paid?`,
      () => {
        console.log('mark order as paid');

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Order ${this.orderData.id} successfully marked as paid!`,
          life: 3000,
        });
      },
      () => {
        console.log('Canceled');
      }
    );
  }

  saveQuickChanges(){
    this.confirmationDialogService.confirm(
      'Are you sure you want to save the changes',
      `order with id ${this.orderData.id}?`,
      () => {
        console.log('save quick changes');

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Saved quick changes successfully!`,
          life: 3000,
        });
      },
      () => {
        console.log('Canceled');
      }
    );
  }

  handleState(data: any) {
    this.orderDialog = data;
  }

  editOrder() {
    this.orderDialog = true;
  }
}
