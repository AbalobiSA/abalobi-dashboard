import { Injectable } from '@angular/core';

import { Fisher } from '../../objects/fisher';

@Injectable()
export class FishersService {

    // Local variables
    private localFishers: Fisher[] = [
        {Id: '1', FirstName: 'A', LastName: 'a', image_url__c: 'https://images.halloweencostumes.com/products/4687/1-1/adult-scream-mask.jpg', primary_community__c: ''},
        {Id: '2', FirstName: 'B', LastName: 'b', image_url__c: 'https://images.halloweencostumes.com/products/4687/1-1/adult-scream-mask.jpg', primary_community__c: ''},
        {Id: '3', FirstName: 'C', LastName: 'c', image_url__c: 'https://images.halloweencostumes.com/products/4687/1-1/adult-scream-mask.jpg', primary_community__c: ''},
        {Id: '4', FirstName: 'D', LastName: 'd', image_url__c: 'https://images.halloweencostumes.com/products/4687/1-1/adult-scream-mask.jpg', primary_community__c: ''},
        {Id: '5', FirstName: 'E', LastName: 'e', image_url__c: 'https://images.halloweencostumes.com/products/4687/1-1/adult-scream-mask.jpg', primary_community__c: ''}
    ];

    constructor() {
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
            if (this.localFishers === null || this.localFishers === undefined) {
                //    TODO: Get from server

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
