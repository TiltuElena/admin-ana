import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Button, ButtonDirective } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { CustomersDataService } from '../../services/customers-data.service';
import { BehaviorSubject } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from '../../../../services/confirmation-dialog/confirmation-dialog.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    AvatarModule,
    Button,
    ButtonDirective,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    PaginatorModule,
    PrimeTemplate,
    Ripple,
    ReactiveFormsModule,
    NgClass,
    TranslateModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  // customers$: BehaviorSubject<any>;
  currentCustomer$: BehaviorSubject<any>;
  // submitted = false;
  avatarImage = '';
  customerForm: FormGroup;
  @Input() customerDialog = false;
  @Output() changeDialogState = new EventEmitter<boolean>();

  constructor(
    private customersDataService: CustomersDataService,
    private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService
  ) {
    // this.customers$ = this.customersDataService.customers$;
    this.currentCustomer$ = this.customersDataService.currentCustomer$;

    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    this.currentCustomer$.subscribe((customer: any) => {
      if (customer) {
        this.customerForm.patchValue({
          name: customer.username,
          email: customer.email,
          phone: customer.phone,
        });
      }
    });

    this.currentCustomer$.subscribe((data: any) => {
      if (data.photoUrl) {
        this.avatarImage =
          'http://localhost:3000' +
          this.currentCustomer$.getValue().photoUrl;
      } else {
        this.avatarImage = this.customersDataService.defaultImage;
      }
    });
  }

  @ViewChild('fileInput') fileInput: any;
  selectedFile: File | null = null;

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  hideDialog() {
    this.customerDialog = false;
    this.changeDialogState.emit(false);
    // this.submitted = false;
    this.customerForm.markAsUntouched();
  }

  onDialogHide() {
    this.changeDialogState.emit(false);
    this.customerForm.markAsUntouched();
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        console.log('Selected file-upload');
      } else {
        console.log('No file-upload selected');
      }

      if (this.currentCustomer$.getValue().id) {
        this.confirmationDialogService.confirm(
          'Are you sure you want to save changes for customer',
          `${this.currentCustomer$.getValue().name}?`,
          () => {
            console.log('Product Updated');

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: `Customer ${
                this.currentCustomer$.getValue().name
              } updated!`,
              life: 3000,
            });

            this.customerDialog = false;
            this.changeDialogState.emit(false);
            this.currentCustomer$.next({});

            this.customerForm.markAsPristine()
          },
          () => {
            console.log('Canceled update!');
          }
        );
      } else {
        console.log('Customer Created!');

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Customer ${this.customerForm.get('name')?.value} created!`,
          life: 3000,
        });

        this.customerDialog = false;
        this.changeDialogState.emit(false);
        this.currentCustomer$.next({});

        this.customerForm.markAsPristine()
      }

      // this.customerDialog = false;
      // this.changeDialogState.emit(false);
      // this.currentCustomer$.next({});
      // this.submitted = true;
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
