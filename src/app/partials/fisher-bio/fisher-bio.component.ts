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
                    this.isLoading = false;

                    this.fisher = f;
                    console.log('Fisher = ' + f);
                }.bind(this)).catch(() => {
                    this.error = true;
                    this.isLoading = false;
                });
            }
        });
    }
}
