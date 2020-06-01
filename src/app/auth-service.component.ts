import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { Constants } from './constants';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
    private _userManager: UserManager;
    private _user: User;
    private _loginChangedSubject = new Subject<boolean>();

    loginChanged = this._loginChangedSubject.asObservable();

    constructor() { 
        const stsSettings = {
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}signin-callback`,
            scope: 'openid profile api1',
            response_type: 'code',
            post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`,
            silent_redirect_uri: `${Constants.clientRoot}silent-renew-callback`,
            automaticSilentRenew: true
        };
        this._userManager = new UserManager(stsSettings);
        this._userManager.events.addUserSignedOut(() => {
            console.info('User signed out');
            this._userManager.removeUser();
        });
        this._userManager.events.addUserSessionChanged(() => {
            console.info('User session changed');
        });
        this._userManager.events.addSilentRenewError((err) => {
            console.error('SilentRenewError ' + err.message);
        });
    }

    login() {
        return this._userManager.signinRedirect();
    }

    isLoggedIn(): Promise<boolean> {
        return this._userManager.getUser().then(user => {
            const userCurrent = !!user && !user.expired;
            if (this._user !== user) {
                this._loginChangedSubject.next(userCurrent);
            }
            this._user = user;
            return userCurrent;
        })
    }

    completeLogin() {
        return this._userManager.signinRedirectCallback().then(user => {
            this._user = user;
            this._loginChangedSubject.next(!!user && !user.expired);
            return user;
        });
    }

    logout() {
        this._userManager.signoutRedirect();
    }

    completeLogout() {
        this._user = null;
        return this._userManager.signoutRedirectCallback();
    }

    silentRenew() {
        return this._userManager.signinSilentCallback().then(user => {
            this._user = user;
            this._loginChangedSubject.next(!!user && !user.expired);
            return user;
        }).catch(err => {
            console.error('An error occurred in silent renew ' + err);
        });
    }

    getSessionStatus() {
        this._userManager.querySessionStatus().then((res) => {
            console.info('Session State: ' + res.session_state);
            console.info('Session Id: ' + res.sid);
        });
    }
}