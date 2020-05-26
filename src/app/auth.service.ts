import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager = new UserManager(getClientSettings());

  user: User;

  constructor(private http: HttpClient) {
    this.manager.getUser().then(user => {
      this.user = user;
    })
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  login() {
    return this.manager.signinRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:5000',
    client_id: 'spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    response_type: "id_token token",
    scope: "openid profile"
  };
}
