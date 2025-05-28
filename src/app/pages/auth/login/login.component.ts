import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { MatInput } from '@angular/material/input';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { PageRoutes } from '../../../shared/enums';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PaginatorModule,
    ReactiveFormsModule,
    PasswordModule,
    MatInput,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RouterLink,
    NgClass,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  registerRoute = PageRoutes.Register;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      // this.authService.login(this.loginForm.getRawValue()).subscribe({
      //   next: (res: any) => {
      //     localStorage.setItem('token', res.token);
      //
      //     this.authService.authenticateUser(res.token);
      //
      //     this.router.navigate(['/']).then();
      //   },
      //   error: (error) => {
      //     console.error('Login failed:', error);
      //     this.router.navigate([PageRoutes.Login]).then();
      //     this.loginForm.reset();
      //     this.snackBar.open(`Wrong credentials`, 'Close', {
      //       ...this.snackbarOptions,
      //     });
      //   },
      // });
      console.log(this.loginForm.getRawValue());
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
