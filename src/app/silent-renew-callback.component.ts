import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-silent-renew-callback',
    template: '<div></div>'
})

export class SilentRenewCallbackComponent implements OnInit {
    constructor(private _authService: AuthService,
                private _router: Router) {}

    ngOnInit() { 
        console.info('Silent Renew');
        this._authService.silentRenew().then(user => {
            this._router.navigate(['/'], { replaceUrl: true});
        });;
    }
}