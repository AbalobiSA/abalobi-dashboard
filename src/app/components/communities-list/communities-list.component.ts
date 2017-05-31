import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { FishersService } from '../../services/fishers/fishers.service';

@Component({
    selector: 'app-communities-list',
    templateUrl: './communities-list.component.html',
    styleUrls: ['./communities-list.component.scss']
})
export class CommunitiesListComponent implements OnInit {

    isLoading = true;
    error = false;

    communities = {};

    constructor(private service: FishersService,
                private router: Router) {
    }

    ngOnInit() {
        this.service.getFishers().then(fishers => {
            for (let i = 0; i < fishers.length; i = i + 1) {
                if (fishers[i].primary_community__c !== null && fishers[i].primary_community__c !== undefined) {
                    if (Object.keys(this.communities).indexOf(fishers[i].primary_community__c) > -1) {
                        this.communities[fishers[i].primary_community__c] += 1;
                    } else {
                        this.communities[fishers[i].primary_community__c] = 1;
                    }
                }
            }

            console.log('Finished processing fishers');
            this.isLoading = false;
        }).catch(err => {
            console.log(err);

            this.error = true;
            this.isLoading = false;
        });
    }

    showFishers(id): void {
        this.router.navigateByUrl(`/communities/${id}/fishers`).
        then(() => console.log(`Navigated to /communities/${id}/fishers`)).
        catch(() => console.log(`Could not navigate to /communities/${id}/fishers`));
    }

}
