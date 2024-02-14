import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) { }

  errorMessage: string = ``;
  forgotErrorMessage: string = ``;

  loginButtonLoader: boolean = false;
  buttonLoader: boolean = false;

  forgotPasswordFlag: boolean = true;
  verifyCodeFlag: boolean = false;
  resetPasswordFlag: boolean = false;

  @ViewChild('closeModal') closeModalButton!: ElementRef;

  // login form
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)])
  });

  // forgot password form
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  // email verify form
  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  // reset password form
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)])
  }, this.comparePasswords.bind(this));

  comparePasswords(registerForm: any) {
    if (registerForm.get('newPassword')?.value == registerForm.get('rePassword')?.value) {
      return null;
    } else {
      return { 'matched': true }
    }
  }

  // function => fires when login button is clicked
  loginSubmit(loginForm: FormGroup) {

    this.loginButtonLoader = true;
    this.errorMessage = ``;

    this._AuthenticationService.loginReq(loginForm.value).subscribe({
      next: (res) => {
        this.loginButtonLoader = false;
        this.errorMessage = ``;
        if (res.message) {
          localStorage.setItem('userToken', res.token);
          this._AuthenticationService.handleUserInfo();
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.loginButtonLoader = false;
      }
    });

  }

  // function => fires when send verification code button is clicked
  forgetSubmit(forgetForm: FormGroup) {
    this.buttonLoader = true;

    this._AuthenticationService.forgetReq(forgetForm.value).subscribe({
      next: (res) => {
        this.buttonLoader = false;
        this.forgotErrorMessage = ``;

        if (res.message) {
          this.forgotPasswordFlag = false;
          this.verifyCodeFlag = true;
        }
      },
      error: (err) => {
        this.buttonLoader = false;
        this.forgotErrorMessage = err.error.message;
      }
    });
  }

  // function => fires when confirm verification code button is clicked
  verifyCodeSubmit(verifyCodeForm: FormGroup) {
    this.buttonLoader = true;

    this._AuthenticationService.verifyCodeReq(verifyCodeForm.value).subscribe({
      next: (res) => {
        this.buttonLoader = false;
        this.forgotErrorMessage = ``;

        if (res.status) {
          this.verifyCodeFlag = false;
          this.resetPasswordFlag = true;
        }
      },
      error: (err) => {
        this.forgotErrorMessage = err.error.message;
        this.buttonLoader = false;
      }
    });
  }

  // function => fires when reset password is clicked
  resetPasswordSubmit(resetPasswordForm: FormGroup) {
    this.buttonLoader = true;

    const formValueToPass = { ...resetPasswordForm.value };
    delete formValueToPass.rePassword;

    this._AuthenticationService.resetPasswordReq(formValueToPass).subscribe({
      next: (res) => {
        this.buttonLoader = false;
        this.forgotErrorMessage = ``;

        if (res.token) {

          this.closeModalButton.nativeElement.click();

          this.loginSubmit(new FormGroup({
            email: new FormControl(resetPasswordForm.value.email),
            password: new FormControl(resetPasswordForm.value.newPassword)
          }));
        }
      },
      error: (err) => {
        this.buttonLoader = false;
        this.forgotErrorMessage = err.error.message;
      }
    })
  }
}
