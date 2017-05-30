import { Component } from '@angular/core';

import { AuthService } from './services/auth/auth-service.service';
import { DeveloperSettingsService } from './services/settings/developer-settings.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        public auth: AuthService,
        public settings: DeveloperSettingsService
    ) {
        if (environment.useAuth) {
            auth.handleAuthentication();
        }
    }
}
