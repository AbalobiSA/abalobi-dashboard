import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Fisher} from '../../objects/fisher';
import {FishersService} from '../../services/fishers/fishers.service';

@Component({
    selector: 'app-community-fishers',
    templateUrl: './community-fishers.component.html',
    styleUrls: ['./community-fishers.component.scss']
})
export class CommunityFishersComponent implements OnInit {

    fishers: Fisher[] = null;
    community: string;

    error = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
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
                this.community = id;

                this.service.getFishers().then(fishers => {
                    this.fishers = fishers.filter(fisher => fisher.primary_community__c === id);
                }).catch(() => {
                   this.error = true;
                });
            }
        });
    }

    navigateToFisher(id): void {
        this.router.navigateByUrl(`/search/fisher/${id}/trips`);
    }
}
