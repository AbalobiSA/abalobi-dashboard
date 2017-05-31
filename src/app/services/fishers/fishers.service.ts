import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Fisher } from '../../objects/fisher';
import { Registration } from '../../objects/registration';
import { Trip } from '../../objects/trip';
import { environment } from '../../../environments/environment';

@Injectable()
export class FishersService {

    private localFishers: Fisher[] = null;

    private whosTrips = '';
    private localFisherTrips: Trip[] = null;
    private localNewRegistrations: Registration[] = null;
    private localRecentRegistrations: Registration[] = null;

    private BASE_URL = environment.API_URL;

    constructor(private http: Http) {

    }

    /**
     *
     * @param id
     */
    getFisherTrips(id: string): Promise<Trip[]> {

        return new Promise(function (resolve, reject) {
            const ABALOBI_USER_TRIPS = this.BASE_URL + `/api/users/${String(id)}/trips`;
            const OPTIONS = this.getRequestOptions();

            if (this.localFisherTrips === null || this.localFisherTrips === undefined) {
                // No trips saved in service, go fetch them
                this.http.get(ABALOBI_USER_TRIPS, OPTIONS).toPromise().then(function (response) {
                    this.localFisherTrips = response.json()['fisher-trips'] as Trip;
                    this.whosTrips = id;

                    resolve(this.localFisherTrips);
                }.bind(this));

            } else if (id === this.whosTrips && this.localFisherTrips !== null && this.localFisherTrips !== undefined) {
                // The trips saved in service are those of the fisher currently being searched for. Just return local saved trips
                resolve(this.localFisherTrips);
            } else {
                // The local saved trips are not for the searched fisher. Go get the correct ones from server.
                this.http.get(ABALOBI_USER_TRIPS, OPTIONS).toPromise().then(function (response) {
                    this.localFisherTrips = response.json()['fisher-trips'] as Trip;
                    this.whosTrips = id;

                    resolve(this.localFisherTrips);
                }.bind(this));
            }
        }.bind(this));
    }

    /**
     *
     * @returns {Promise<T>}
     */
    getFishers(): Promise<Fisher[]> {

        return new Promise(function (resolve, reject) {
            const ABALOBI_USERS = this.BASE_URL + '/api/users';
            const OPTIONS = this.getRequestOptions();

            if (this.localFishers === null || this.localFishers === undefined) {
                this.http.get(ABALOBI_USERS, OPTIONS).toPromise().then(function (response) {
                    this.localFishers = response.json()['abalobi-users'] as Fisher;

                    resolve(this.localFishers);
                }.bind(this)).catch(() => reject());

            } else {
                console.log('Service has fisher values already');
                resolve(this.localFishers);
            }
        }.bind(this)); // NOTE: The bind `should` keep this as the parent object
    }

    /**
     *
     * @param id
     * @returns {Promise<T>}
     */
    getFisher(id: string): Promise<Fisher> {
        return new Promise(function (resolve, reject) {
            this.getFishers().then(function (fishers) {
               const f = fishers.filter(item => item.Id === id)[0];
               resolve(f);
            }).catch(() => reject());
        }.bind(this));
    }

    /**
     *
     * @returns {Promise<T>}
     */
    getNewRegistrations(): Promise<Registration[]> {

        return new Promise(function (resolve, reject) {
            const QUERY = this.BASE_URL + '/api/registrations_new';
            const OPTIONS = this.getRequestWithAuthOptions();

            console.log(OPTIONS);

            if (this.localNewRegistrations === null || this.localNewRegistrations === undefined) {
                // No trips saved in service, go fetch them
                this.http.get(QUERY, OPTIONS).toPromise().then(function (response) {
                    this.localNewRegistrations = response.json()['registrations'] as Registration;
                    resolve(this.localNewRegistrations);
                }.bind(this));

            } else {
                // The trips saved in service are those of the fisher currently being searched for. Just return local saved trips
                resolve(this.localNewRegistrations);
            }
        }.bind(this));
    }

    getRecentRegistrations(): Promise<Registration[]> {

        return new Promise(function (resolve, reject) {
            const QUERY = this.BASE_URL + '/api/registrations_recent';
            const OPTIONS = this.getRequestWithAuthOptions();

            console.log(OPTIONS);

            if (this.localRecentRegistrations === null || this.localRecentRegistrations === undefined) {
                // No trips saved in service, go fetch them
                this.http.get(QUERY, OPTIONS).toPromise().then(function (response) {
                    this.localRecentRegistrations = response.json()['registrations'] as Registration;
                    resolve(this.localRecentRegistrations);
                }.bind(this));

            } else {
                // The trips saved in service are those of the fisher currently being searched for. Just return local saved trips
                resolve(this.localRecentRegistrations);
            }
        }.bind(this));
    }

    /**
     *
     * @param input
     * @returns {Promise<T>}
     */
    sendSMS(input): Promise<string> {

        return new Promise(function (resolve, reject) {
            const postURL = this.BASE_URL + '/api/sms';
            // console.log('Auth: \n' + JSON.stringify(HEADERS, null, 4));
            const headers = new Headers({'Authorization' : 'Bearer ' + localStorage.getItem('id_token')});
            const body = {
                toNumber: input.toNumber,
                messageBody: input.messageBody,
                timeStamp: (new Date())
            };

            const options = new RequestOptions({
                headers: headers
            });

            // options.headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('id_token')});

            console.log('Request: ' + JSON.stringify(options, null, 4));

            this.http.post(postURL, body, options).toPromise().then(function (response) {
                // this.localNewRegistrations = response.json()['registrations'] as Registration;
                // console.log(JSON.stringify(response.json(), null, 4));
                // resolve(this.localNewRegistrations);
                resolve(response.json());
            }.bind(this)).catch(error => {
                console.log('Error occurred while sending sms');
                console.log('ERROR: ' + error);
                resolve({message: 'Your message failed to send!'});
            });
        }.bind(this));
    }

    /**
     *
     * @returns {RequestOptions}
     */
    getRequestOptions(): RequestOptions {
        // const TOKEN = localStorage.getItem('id_token');
        // console.log("ACCESS TOKEN: " + localStorage.getItem('access_token'));
        // console.log("ID TOKEN: " + localStorage.getItem('id_token'));
        const HEADERS = new Headers();
        // HEADERS.append('Authorization', btoa(TOKEN));
        return new RequestOptions({headers: HEADERS});
    }

    getRequestWithAuthOptions(sentBody): RequestOptions {
        const TOKEN = localStorage.getItem('id_token');
        console.log('ACCESS TOKEN: ' + localStorage.getItem('access_token'));
        console.log('ID TOKEN: ' + localStorage.getItem('id_token'));

        const HEADERS = new Headers();
        HEADERS.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        console.log('Auth: \n' + JSON.stringify(HEADERS, null, 4));

        let finalRequest;

        if (sentBody) {
            finalRequest = new RequestOptions({headers: HEADERS, body: sentBody});
        } else {
            finalRequest = new RequestOptions({headers: HEADERS});
        }

        return finalRequest;
    }
}
/*
 {
 toName: '',
 toNumber: '',
 fromName: '',
 fromNumber: '',
 timeStamp: ''
 }
 */
