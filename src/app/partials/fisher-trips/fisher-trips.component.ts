import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

import { FishersService } from '../../services/fishers/fishers.service';

import { Trip } from '../../objects/trip';
import { Fisher } from '../../objects/fisher';

@Component({
  selector: 'app-fisher-trips',
  templateUrl: './fisher-trips.component.html',
  styleUrls: ['./fisher-trips.component.scss']
})
export class FisherTripsComponent implements OnInit {

    fisher: Fisher = null;
    trips: Trip[] = null;

    error = false;
    isLoading = true;

    hideCancelledTrips = false;
    hideSuccessfulTrips = false;
    hideEmptyTrips = false;

    startDate: string = null;
    endDate: string = null;

    constructor(
        private route: ActivatedRoute,
        private service: FishersService) {

    }

    ngOnInit() {
        // Get the fisher with this id
        this.route.parent.params.subscribe(params => {
            if (!params['id']) {
                console.log('ID param not present');
                this.error = true;
            } else {
                const id = params['id'];
                console.log('ID = ' + id);

                this.service.getFisher(id).then(function (f) {
                    this.fisher = f;
                    console.log('Fisher = ' + f);

                    this.service.getFisherTrips(f.Id).then(ts => {
                        this.trips = ts;
                        this.isLoading = false;
                    });
                }.bind(this)).catch(() => {
                    this.error = true;
                    this.isLoading = false;
                });
            }
        });
    }

    /**
     * Filter trips
     */
    filter(): void {

        this.service.getFisherTrips(this.fisher.Id).then(trips => {
            if (this.startDate !== null && this.startDate !== undefined && this.startDate !== '') {
                trips = trips.filter(item => (new Date(item.trip_date__c)).getTime() >= (new Date(this.startDate)).getTime());
            }

            if (this.endDate !== null && this.endDate !== undefined && this.endDate !== '') {
                trips = trips.filter(item => (new Date(item.trip_date__c)).getTime() <= (new Date(this.endDate)).getTime());
            }

            if (this.hideCancelledTrips) {
                trips = trips.filter(item => item.trip_has__c === 'yes');
            }

            if (this.hideSuccessfulTrips) {
                trips = trips.filter(item => item.trip_has__c === 'no' || item.trip_has__c === null);
            }

            if (this.hideEmptyTrips) {
                trips = trips.filter(item => item.catch_has__c === 'yes');
            }

            this.trips = trips;
        }).catch(err => {
            console.log(err);

            this.error = true;
        });
    }
}
