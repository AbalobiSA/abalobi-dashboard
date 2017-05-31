import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FishersService } from '../../services/fishers/fishers.service';
import { Fisher } from 'app/objects/fisher';

@Component({
    selector: 'app-fisher-detail',
    templateUrl: './fisher-detail.component.html',
    styleUrls: ['./fisher-detail.component.scss']
})
export class FisherDetailComponent implements OnInit {

    fisher: Fisher = null;

    isGreen = false; // Last week
    isOrange = false; // last month
    isRed = false; // has trip
    isBlack = false; // no trips

    error = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private service: FishersService) {
    }

    ngOnInit() {
        // Get the fisher with this id
        this.route.params.subscribe(params => {
            if (!params['id']) {
                console.log('ID param not present');
                this.error = true;
            } else {
                const id = params['id'];

                this.service.getFisher(id).then(f => {
                    this.fisher = f;

                    this.service.getFisherTrips(this.fisher.Id).then(trips => {
                        const week = trips.filter(trip => {
                            const d1 = new Date(trip.trip_date__c);
                            const d2 = new Date();

                            return ((d2.getTime() - d1.getTime()) / (1000.0 * 60.0 * 60.0 * 24.0)) <= 7.0;
                        });

                        if (week.length > 0) {
                            this.isGreen = true;
                            return;
                        }

                        const month = trips.filter(trip => {
                            const d1 = new Date(trip.trip_date__c);
                            const d2 = new Date();

                            return ((d2.getTime() - d1.getTime()) / (1000.0 * 60.0 * 60.0 * 24.0)) <= 28.0;
                        });

                        if (month.length > 0) {
                            this.isOrange = true;
                            return;
                        }

                        if (trips.length > 0) {
                            this.isRed = true;
                            return;
                        }

                        if (trips.length === 0) {
                            this.isBlack = true;
                            return;
                        }
                    });
                }).catch(() => this.error = true);
            }
        });
    }

    goBack(): void {
        this.location.back();
    }
}
