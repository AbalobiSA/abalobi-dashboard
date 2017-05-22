import { Component, OnInit } from '@angular/core';

import { Fisher } from '../../objects/fisher';
import { FishersService } from '../../services/fishers/fishers.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

    searchBoxText: string;

    error = false;
    isLoading = true;

    fishers: Fisher[];

    constructor(
        private service: FishersService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.service.getFishers().then(f => {
            this.isLoading = false;
            this.fishers = f;
        });
    }

    goFetchFishers() {

    }

    filter(): void {
        this.isLoading = true;

        const smartFilter = function(s, n) {
            if (n === null || n === undefined) {
                return -1;
            } else {
                return n.toLowerCase().indexOf(s.toLowerCase());
            }
        };

        if (this.searchBoxText === '') {
            this.service.getFishers().then(f => {
                this.isLoading = false;
                this.fishers = f;
            });
        } else {
            console.log(this.searchBoxText);

            this.service.getFishers().then(
                fishers => {
                    this.fishers = fishers.filter(
                        item => smartFilter(this.searchBoxText, item.FirstName) !== -1 ||
                        smartFilter(this.searchBoxText, item.LastName) !== -1
                    );

                    this.isLoading = false;
                }).catch(() => {
                this.error = true;
                this.isLoading = false;

                this.fishers = null;
            });
        }
    }

    goto(id: string): void {
        this.router.navigateByUrl('fisher/' + id);
    }
}
