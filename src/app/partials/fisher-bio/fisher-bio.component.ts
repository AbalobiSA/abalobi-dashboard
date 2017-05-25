import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Fisher } from '../../objects/fisher';
import { FishersService } from '../../services/fishers/fishers.service';

@Component({
    selector: 'app-fisher-bio',
    templateUrl: './fisher-bio.component.html',
    styleUrls: ['./fisher-bio.component.scss']
})
export class FisherBioComponent implements OnInit {

    fisher: Fisher = null;
    age: number = null;

    error = false;
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private service: FishersService
    ) {}

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

                    this.calcFisherAge();

                    this.isLoading = false;
                }.bind(this)).catch(() => {
                    this.error = true;
                    this.isLoading = false;
                });
            }
        });
    }

    calcFisherAge(): void {

        const dob = new Date(this.fisher.date_of_birth__c);
        const today = new Date();

        if (!this.fisher.date_of_birth__c) {
           this.error = true;
        } else {
            const diff = today.getTime() - dob.getTime();

            this.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }
    }
}
