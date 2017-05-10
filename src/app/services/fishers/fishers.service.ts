import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Fisher } from '../../objects/fisher';
import {Trip} from '../../objects/trip';

@Injectable()
export class FishersService {

    private localFishers: Fisher[] = null;
    private localFisherTrips: Trip[] = null;

    constructor(private http: Http) {
    }

    /**
     *
     * @param id
     */
    getFisherTrips(id: string): Promise<Trip[]> {

        return new Promise(function (resolve, reject) {
            const ABALOBI_USER_TRIPS = 'http://197.85.186.65:8080/fisher-trips?filter%5BOwnerId%5D=' + String(id);

            if (this.localFisherTrips === null || this.localFisherTrips === undefined) {
                this.http.get(ABALOBI_USER_TRIPS).toPromise().then(function (response) {
                    this.localFisherTrips = response.json()['fisher-trips'] as Trip;

                    console.log('GOT SOME NEW TRIPS');
                    resolve(this.localFisherTrips);
                }.bind(this));

            } else {
                console.log('Service has fisher trip values already');
                resolve(this.localFisherTrips);
            }
        }.bind(this));
    }


    /**
     *
     * @returns {Promise<T>}
     */
    getFishers(): Promise<Fisher[]> {

        return new Promise(function (resolve, reject) {
            const ABALOBI_USERS = 'http://197.85.186.65:8080/abalobi-users';

            if (this.localFishers === null || this.localFishers === undefined) {
                this.http.get(ABALOBI_USERS).toPromise().then(function (response) {
                    this.localFishers = response.json()['abalobi-users'] as Fisher;

                    resolve(this.localFishers);
                }.bind(this)).catch(() => reject());

            } else {
                console.log('Service has fisher values already');
                resolve(this.localFishers);
            }
        }.bind(this)); // NOTE: The bind `should` keep this as the parent object
    }

    getFisher(id: string): Promise<Fisher> {
        return new Promise(function (resolve, reject) {
            this.getFishers().then(function (fishers) {
               const f = fishers.filter(item => item.Id === id)[0];
               resolve(f);
            }).catch(() => reject());
        }.bind(this));
    }
}
