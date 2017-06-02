import { Injectable } from '@angular/core';
import { Event, Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: 'FjJZhJDTzEIjR0Yj1vjZABJuwBZ6gCzQ',
        domain: 'app56729554.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://app56729554.eu.auth0.com/userinfo',
        // redirectUri: 'http://localhost:8080/#/home',
        redirectUri: 'http://abalobi-dashboard-ng2.herokuapp.com/#/home',
        scope: 'openid'
    });

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) {
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

    public handleAuthenticationWithHash(): void {
        this
            .router
            .events
            .filter((event: Event) => event instanceof NavigationStart)
            // .filter(event => (event.url !== undefined))
            .map((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
            // .filter(event => (/access_token|id_token|error/).test(event.url))
            .subscribe(event => {
                this.auth0.resumeAuth(window.location.hash, (error, authResult) => {
                    if (error) {
                        return console.log(error);
                    }
                    this.setUser(authResult);
                    this.router.navigateByUrl('/');
                });
            });
    }

    // private handleRedirectWithHash2() {
    //     this.router.events.take(1).subscribe(event => {
    //         if (/access_token/.test(event.url) || /error/.test(event.url)) {
    //
    //             let authResult = this.auth0.parseHash(window.location.hash);
    //
    //             if (authResult && authResult.idToken) {
    //                 this.lock.emit('authenticated', authResult);
    //             }
    //
    //             if (authResult && authResult.error) {
    //                 this.lock.emit('authorization_error', authResult);
    //             }
    //         }
    //     });
    // }

    private setUser(authResult): void {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
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
