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

                this.service.getFishers().then(fishers => this.assignFisher(fishers.filter(item => item.Id === id)));
            }
        });
    }

    private assignFisher(fishers: Fisher[]): void {
        if (fishers.length > 0) {
            this.fisher = fishers[0];
        } else {
            console.log('No Fisher With This ID');
            this.error = true;
        }
    }

    private goBack(): void {
        this.location.back();
    }

}
