import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;

  constructor(private _authService: AuthService) {
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    this._authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

}
