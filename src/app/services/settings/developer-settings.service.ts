import { Injectable } from '@angular/core';

@Injectable()
export class DeveloperSettingsService {

    constructor() {

    }

    getDeveloperMode(): boolean {
        return true;
    }

}
