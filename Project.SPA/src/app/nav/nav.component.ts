import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Zalogowałeś się do aplikacji');
    }, error => {
      this.alertify.error('Wystąpił błąd logowania');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // jeśli coś się znajduje w tokenia to return true jeśli będzie pusta to false
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('zostałeś wylogowany');
  }

}
