import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Zalogowałeś się do aplikacji');
    }, error => {
      console.log('Wystąpił błąd logowania');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // jeśli coś się znajduje w tokenia to return true jeśli będzie pusat to false
  }

  logout() {
    localStorage.removeItem('token');
    console.log('zostałeś wylogowany');
  }

}
