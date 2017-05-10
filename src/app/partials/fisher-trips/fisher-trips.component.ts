import { Component, OnInit } from '@angular/core';
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

                    this.service.getFisherTrips(f.Id).then(ts => this.trips = ts);
                }.bind(this)).catch(() => this.error = true);
            }
        });
    }
}
