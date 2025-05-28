import { Component, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { NgClass } from '@angular/common';
import { ConfirmationDialogService } from '../../services/confirmation-dialog/confirmation-dialog.service';
import { Ripple } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import {confirmPasswordValidator} from '../../shared/validators/confirm-password';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    AvatarModule,
    FileUploadModule,
    NgClass,
    Ripple,
    CardModule,
    TranslateModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  accountForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService
  ) {
    this.accountForm = this.fb.group({
      username: ['Tîltu Elena', [Validators.required]],
      email: ['tiltu@gmail.com', [Validators.required, Validators.email]],
    });

    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      new_password_confirmation: [
        '',
        [
          Validators.required,
          confirmPasswordValidator('password', 'new_password_confirmation'),
        ],
      ],
    });

    this.changePasswordForm.valueChanges.subscribe(() => {
      this.checkConfirmPasswordValidity(this.changePasswordForm);
      this.checkPassword();
    });
  }

  checkConfirmPasswordValidity(settingsForm: FormGroup) {
    const confirmControl = settingsForm.controls['new_password_confirmation'];
    if (confirmControl.errors && confirmControl.errors['passwordMismatch']) {
      confirmControl.setErrors(null);
    }
    if (confirmControl.value !== settingsForm.controls['new_password'].value) {
      confirmControl.setErrors({ passwordMismatch: true });
    }
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

  checkPassword() {
    const passwordControl = this.changePasswordForm.controls['new_password'];

    if (
      passwordControl.value ===
      this.changePasswordForm.controls['old_password'].value
    ) {
      passwordControl.setErrors({ samePassword: true });
    } else {
      passwordControl.setErrors(null);
      this.checkConfirmPasswordValidity(this.changePasswordForm);
    }
  }

  avatarImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s';

  onSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteAvatar() {
    this.avatarImage =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s';
    this.selectedFile = null;
  }

  submit() {
    if (this.accountForm.valid) {
      this.confirmationDialogService.confirm(
        'Are you sure you want to change the account settings?',
        '',
        () => {
          console.log(this.accountForm.getRawValue());

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User settings successfully changed!`,
            life: 3000
          });
        },
        () => {
          console.log('Canceled');
        }
      );
    } else {
      console.log('Form is invalid');
      this.accountForm.markAllAsTouched();
    }
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.confirmationDialogService.confirm(
        'Are you sure you want to change your password?',
        '',
        () => {
          console.log(this.changePasswordForm.getRawValue());

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User password successfully changed!`,
            life: 3000
          });
        },
        () => {
          console.log('Canceled');
        }
      );
    } else {
      console.log('Form is invalid');
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
