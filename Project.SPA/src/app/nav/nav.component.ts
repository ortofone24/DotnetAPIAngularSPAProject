import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Zalogowałeś się do aplikacji');
    }, error => {
      this.alertify.error(error);
    }, () => {  // funkcja anonimowa
      this.router.navigate(['/uzytkownicy']); // przekierowanie do strony
    });
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token; // jeśli coś się znajduje w tokenia to return true jeśli będzie pusta to false
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('zostałeś wylogowany');
    this.router.navigate(['/home']); // przekierowanie do strony
  }

}
