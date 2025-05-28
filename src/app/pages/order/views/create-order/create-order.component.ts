import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogComponent } from './components/dialog/dialog.component';
import { DataService } from './services/data.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from '../../../../api/modules/customer.service';
import {MdlCurrencyPipe} from '../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonDirective,
    CardModule,
    DividerModule,
    DropdownModule,
    MdlCurrencyPipe,
    PrimeTemplate,
    Ripple,
    TableModule,
    TagModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    DialogComponent,
    DialogComponent,
    NgClass,
    TranslateModule
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent {
  orderForm: FormGroup;
  workplaceDialog = false;
  workplaces: any = [];
  totalPrice = 0;
  numberOfDays = 0;
  minDate: Date = new Date();
  submited = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private workplaceDataService: DataService,
    private messageService: MessageService,
    private customersService: CustomerService,
  ) {
    this.orderForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      booked_from: ['', Validators.required],
      booked_to: ['', Validators.required],
      status: ['', Validators.required],
      payment_status: ['', Validators.required],
      notes: [''],
    });

    this.orderForm.get('booked_from')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });
    this.orderForm.get('booked_to')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });

    this.workplaceDataService.workplaces$.subscribe((workplaces: any) => {
      this.workplaces = workplaces;
      if (workplaces) {
        this.totalPrice = this.workplaces.reduce(
          (total: number, workplace: any) => {
            return total + workplace.booking_price;
          },
          0
        );
      }
    });
  }

  calculateDays(): void {
    const bookedFrom = this.orderForm.get('booked_from')?.value;
    const bookedTo = this.orderForm.get('booked_to')?.value;

    if (bookedFrom && bookedTo) {
      const from = new Date(bookedFrom);
      const to = new Date(bookedTo);

      if (from.getTime() > to.getTime()) {
        this.orderForm.get('booked_to')?.setValue(0);
        this.orderForm.get('booked_to')?.setErrors({ incorrect: true });
      } else {
        const differenceInTime = to.getTime() - from.getTime();

        if (differenceInTime == 0) {
          this.numberOfDays = 1;
        } else {
          this.numberOfDays = differenceInTime / (1000 * 3600 * 24) + 1;
        }
      }
    }
  }

  get total(): number {
    return this.numberOfDays * this.totalPrice;
  }

  navigateToOrders() {
    this.router.navigate(['/orders']).then();
  }

  customerOptions = [
    { label: 'Alle Mare', value: 'Alle Mare' },
    { label: 'Hanah Eje', value: 'Hanah Eje' },
    { label: 'James Butt', value: 'James Butt' },
  ];

  statusOptions = [
    { label: 'New', value: 'new' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Rejected', value: 'rejected' },
  ];

  paymentStatusOptions = [
    { label: 'Paid', value: 'paid' },
    { label: 'Not paid', value: 'notPaid' },
  ];

  ngOnInit(){
    this.customersService.getAll().subscribe((users: any) => {
      if (users.data && users.data.length > 0) {
        this.customerOptions = users.data.map((user: any) => ({
          label: user.username,
          value: user.username,
        }));
      }
    });
  }

  createOrder() {
    console.log(this.orderForm.getRawValue(), 'workplaces: ', this.workplaces);
    if (this.orderForm.valid && this.workplaces.length > 0) {
      this.router.navigate(['/orders']).then();
      this.submited = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Order successfully created!`,
        life: 3000,
      });
    } else {
      console.log('invalid');
      this.orderForm.markAllAsTouched();
      this.submited = true;
    }
  }

  cancelOrder() {
    console.log('cancel order');
    this.router.navigate(['/orders']).then();
  }

  addWorkplaces() {
    this.workplaceDialog = true;
  }

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

  deleteWorkplace(workplace: any) {
    console.log('delete workplace', workplace);
  }

  handleState(data: any) {
    this.workplaceDialog = data;
  }
}
