import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/filter';

import auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: 'FjJZhJDTzEIjR0Yj1vjZABJuwBZ6gCzQ',
        domain: 'app56729554.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://app56729554.eu.auth0.com/userinfo',
        // redirectUri: 'http://localhost:4200/home',
        redirectUri: 'http://abalobi-dashboard-ng2.herokuapp.com/home',
        scope: 'openid'
    });

    constructor(public router: Router) {
    }

    public login(): void {
        this.auth0.authorize();

        console.log(localStorage.getItem('access_token'));
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else {
                this.login();
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        console.log('User logged out');
        this.login();
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

}
