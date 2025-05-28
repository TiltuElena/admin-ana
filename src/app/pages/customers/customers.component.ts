import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DatePipe, NgClass } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { CustomerService } from '../../api/modules/customer.service';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogComponent } from './components/dialog/dialog.component';
import { CustomersDataService } from './services/customers-data.service';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationDialogService } from '../../services/confirmation-dialog/confirmation-dialog.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    DropdownModule,
    FormsModule,
    TagModule,
    NgClass,
    MultiSelectModule,
    InputTextModule,
    ButtonDirective,
    Ripple,
    Button,
    DialogModule,
    InputTextareaModule,
    ConfirmDialogModule,
    CalendarModule,
    DatePipe,
    AvatarModule,
    FileUploadModule,
    DialogComponent,
    TranslateModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  @ViewChild('dt') dt!: Table;
  customers$: BehaviorSubject<any>;
  currentCustomer$: BehaviorSubject<any>;
  loading = false;
  isSorted: any = null;
  initialValue: any;
  selectedCustomers: any;
  defaultImage = ''
  customerDialog = false;

  constructor(
    private customerService: CustomerService,
    private customerDataService: CustomersDataService,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService
  ) {
    this.customers$ = this.customerDataService.customers$;
    this.currentCustomer$ = this.customerDataService.currentCustomer$;
    this.defaultImage = this.customerDataService.defaultImage;
  }

  ngOnInit() {
    // this.customerService.getCustomersMedium().then((customers) => {
    //   this.customers$.next(customers);
    //   this.loading = false;
    //   this.initialValue = [...customers];
    //
    //   this.customers$
    //     .getValue()
    //     .forEach(
    //       (customer: any) => (customer.date = new Date(<Date>customer.date))
    //     );
    // });

    this.customerService.getMe().subscribe(customer => {
      console.log(customer);
      console.log('aaaaaaaa')
    })

    this.customerService.getAll().subscribe((customers: any) => {
      console.log(customers);
      this.customers$.next(customers.data);
      this.loading = false;
      this.initialValue = [...customers.data];

      this.customers$
        .getValue()
        .forEach(
          (customer: any) => (customer.date = new Date(<Date>customer.date))
        );
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
      this.customers$.next([...this.initialValue]);
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
    this.currentCustomer$.next({});
    this.customerDialog = true;
  }

  editCustomer(product: any) {
    this.currentCustomer$.next({ ...product });
    this.customerDialog = true;
  }

  deleteCustomer(customer: any) {
    this.confirmationDialogService.confirm(
      'Are you sure you want to delete',
      `${customer.username}?`,
      () => {
        console.log('Customer deleted:', customer);
        const result = this.customers$
          .getValue()
          .filter((val: any) => val.id !== customer.id);
        this.customers$.next(result);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Customer ${customer.username} successfully deleted!`,
          life: 3000
        });
      },
      () => {
        console.log('Customer deletion canceled');

        // this.messageService.add({
        //   severity: 'warn',
        //   summary: 'Warn',
        //   detail: `Customer deletion canceled!`,
        //   life: 2000
        // });
      }
    );
  }

  handleState(data: any) {
    this.customerDialog = data;
  }
}
