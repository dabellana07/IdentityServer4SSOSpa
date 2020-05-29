import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth-service.component';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): Promise<boolean> {
    return this.auth.isLoggedIn().then((res) => {
      if (!res) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }).catch(() => {
      return false;
    });
  }
}