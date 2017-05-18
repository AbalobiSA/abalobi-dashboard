import { Component } from '@angular/core';

import { AuthService } from './services/auth/auth-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public auth: AuthService) {
        auth.handleAuthentication();

        // auth.login();
    }
}
