import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spa-client';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.isLoggedIn().then((res) => {
      console.log('Is User Signed In ' + res);
    });
  }
}
