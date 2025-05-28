import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from '@angular/router';

import { NgClass } from '@angular/common';
import { PageRoutes } from '../../../shared/enums';
import { Ripple } from 'primeng/ripple';
import { TranslateModule } from '@ngx-translate/core';
import {confirmPasswordValidator} from '../../../shared/validators/confirm-password';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    Ripple,
    TranslateModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  loginRoute = PageRoutes.Login;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: [
        '',
        [
          Validators.required,
          confirmPasswordValidator('password', 'confirm_password'),
        ],
      ],
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.checkConfirmPasswordValidity(this.registerForm);
    });
  }

  checkConfirmPasswordValidity(loginForm: FormGroup) {
    const confirmControl = loginForm.controls['confirm_password'];
    if (confirmControl.errors && confirmControl.errors['passwordMismatch']) {
      confirmControl.setErrors(null);
    }
    if (confirmControl.value !== loginForm.controls['password'].value) {
      confirmControl.setErrors({ passwordMismatch: true });
    }
  }

  submit() {
    if (this.registerForm.valid) {
      // this.authService.register({...this.registerForm.value}).subscribe({
      //   next: (res: any) => {
      //     localStorage.setItem('token', res.token);
      //
      //     this.authService.authenticateUser(res.token);
      //
      //     this.router.navigate(['/']).then();
      //   },
      //   error: (error) => {
      //     console.error('Registration failed:', error);
      //   },
      // });
      console.log(this.registerForm.getRawValue());
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
