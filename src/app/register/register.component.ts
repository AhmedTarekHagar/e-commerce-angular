import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) { }

  errorMessage!: string;

  registerButtonLoader: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z].{6}/)])
  }, this.comparePasswords.bind(this));

  // fires when submit button is clicked
  registerSubmit(registerForm: FormGroup) {

    this.registerButtonLoader = true;

    this._AuthenticationService.registerReq(registerForm.value).subscribe({
      next: (res) => {
        this.registerButtonLoader = false;
        this.errorMessage = ``;
        if (res.message == 'success') {
          localStorage.setItem('userToken', res.token);
          this._AuthenticationService.handleUserInfo();
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.registerButtonLoader = false;
      }
    });

  }

  comparePasswords(registerForm: any) {
    if (registerForm.get('password')?.value == registerForm.get('rePassword')?.value) {
      return null;
    } else {
      return { 'matched': true }
    }
  }
}
