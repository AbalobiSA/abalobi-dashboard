import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Fisher } from '../../objects/fisher';

@Injectable()
export class FishersService {

    private localFishers: Fisher[] = null;

    constructor(private http: Http) {
    }

    // Getter and setter for localFishers
    /**
     *
     * @param fishers
     */
    setFishers(fishers): void {
        this.localFishers = fishers;
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
                }.bind(this)).catch(err => console.log(err));

            } else {
                console.log('Service has values already');
                resolve(this.localFishers);
            }
        }.bind(this)); // NOTE: The bind `should` keep this as the parent object
    }

    getFisher(id: number): Promise<Fisher> {
        return new Promise(function (resolve, reject) {
            this.getFishers().then(function (f) {
            //    TODO: Find the fisher with id or name or something
            }, function (err) {
                reject();
            });
        }.bind(this)); // NOTE: The bind `should` keep this as the parent object
    }
}
