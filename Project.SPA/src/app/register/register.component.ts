import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

// @Input() valuesFromHome: any; // przyjecie wartości z komponentu home przez inputa
  @Output() cancelRegister = new EventEmitter(); // wysłanie wartości z komponentu dziecka do rodzica
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('rejestracja udana');
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value)
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Anulowane');
  }


}
