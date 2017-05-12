import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FishersService } from '../../services/fishers/fishers.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})

export class CommunitiesComponent implements OnInit {

    isLoading = true;
    error = false;

    communities: {};

    constructor(private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private service: FishersService
    ) { }

    ngOnInit() {
        this.service.getFishers().then(fishers => {
            for (let i = 0; i < fishers.length; i = i + 1) {
                if (fishers[i].primary_community__c in this.communities) {
                    this.communities[fishers[i].primary_community__c] += 1;
                } else {
                    this.communities[fishers[i].primary_community__c] = 1;
                }
            }

            console.log(this.communities);
        }).catch(() => {
            this.error = true;
            this.isLoading = false;
        });
    }

    getKeys(): Array<string> {
        return Object.keys(this.communities);
    }

    private goBack(): void {
        this.location.back();
    }
}

interface Dictionary {
    [ index: string ]: number;
}
