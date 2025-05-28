import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { NgClass } from '@angular/common';
import { OrderDataService } from '../../services/order-data.service';
import { ConfirmationDialogService } from '../../../../../../services/confirmation-dialog/confirmation-dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from '../../../../../../api/modules/customer.service';
import { combineLatest, filter } from 'rxjs';
import {MdlCurrencyPipe} from '../../../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ButtonDirective,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    MdlCurrencyPipe,
    PrimeTemplate,
    Ripple,
    TableModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    TagModule,
    NgClass,
    TranslateModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  customerOptions = [
    { label: 'elena', value: 'elena' },
    { label: 'Elena Tiltu', value: 'Elena Tiltu' }
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

  orderForm: FormGroup;
  // workplaces: any = [];
  // totalPrice = 0;
  // numberOfDays = 0;
  // minDate: Date = new Date();
  @Input() orderDialog = false;
  @Output() changeDialogState = new EventEmitter<boolean>();
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private orderDataService: OrderDataService,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService,
    private customersService: CustomerService
  ) {
    this.orderForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      booked_from: ['', Validators.required],
      booked_to: ['', Validators.required],
      status: ['', Validators.required],
      payment_status: ['', Validators.required],
    });
  }

  // ngOnInit(): void {
  //   this.customersService.getAll().subscribe((users: any) => {
  //     if (users.data && users.data.length > 0) {
  //       this.customerOptions = users.data.map((user: any) => ({
  //         label: user.username,
  //         value: user.username,
  //       }));
  //     }
  //   });
  //
  //   this.orderDataService.currentOrder$.subscribe((currentOrder) => {
  //     if (!currentOrder) return;
  //
  //     const currentUser = this.customerOptions.find(
  //       (option: any) => option.value == currentOrder.user?.username
  //     );
  //
  //     const currentStatus = this.statusOptions.find(
  //       (option: any) => option.value == currentOrder.status
  //     );
  //
  //     const currentPaymentStatus = this.paymentStatusOptions.find(
  //       (option: any) => option.value == currentOrder.payment_status
  //     );
  //
  //     this.orderForm.patchValue({
  //       username: currentUser,
  //       email: currentOrder.user?.email,
  //       phone: currentOrder.user?.phone,
  //       booked_from: new Date(currentOrder.booked_from),
  //       booked_to: new Date(currentOrder.booked_to),
  //       status: currentStatus,
  //       payment_status: currentPaymentStatus,
  //     });
  //   });
  // }

  ngOnInit(): void {
    const customers$ = this.customersService.getAll();
    const currentOrder$ = this.orderDataService.currentOrder$.pipe(filter(Boolean)); // filter out nulls

    combineLatest([customers$, currentOrder$]).subscribe(([usersResponse, currentOrder]) => {
      if (usersResponse.data && usersResponse.data.length > 0) {
        this.customerOptions = usersResponse.data.map((user: any) => ({
          label: user.username,
          value: user.username,
        }));
      }

      const currentUser = this.customerOptions.find(
        (option: any) => option.value === currentOrder.user?.username
      );

      const currentStatus = this.statusOptions.find(
        (option: any) => option.value === currentOrder.status
      );

      const currentPaymentStatus = this.paymentStatusOptions.find(
        (option: any) => option.value === currentOrder.payment_status
      );

      this.orderForm.patchValue({
        username: currentUser,
        email: currentOrder.user?.email,
        phone: currentOrder.user?.phone,
        booked_from: new Date(currentOrder.booked_from),
        booked_to: new Date(currentOrder.booked_to),
        status: currentStatus,
        payment_status: currentPaymentStatus,
      });
    });
  }


  hideDialog() {
    this.orderDialog = false;
    this.changeDialogState.emit(false);
    this.submitted = false;
  }

  onDialogHide() {
    this.changeDialogState.emit(false);
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

  saveChanges() {
    this.confirmationDialogService.confirm(
      'Are you sure you want to save the changes for order with id',
      `${this.orderDataService.currentOrder$.getValue().id}?`,
      () => {
        console.log('save changes');

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Order ${this.orderDataService.currentOrder$.getValue().id} successfully changed!`,
          life: 2000,
        });

        this.orderDialog = false;
      },
      () => {
        console.log('Saving changes canceled');
      }
    );

    // console.log('save changes');
    // this.orderDialog = false;
  }
}
