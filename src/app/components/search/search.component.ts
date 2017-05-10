import { Component, OnInit } from '@angular/core';

import { Fisher } from '../../objects/fisher';
import { FishersService } from '../../services/fishers/fishers.service';
import { FisherBlockComponent } from '../../partials/fisher-block/fisher-block.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    searchboxText: string;

    fishers: Fisher[];

    constructor(
        private service: FishersService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.service.getFishers().then(f => this.fishers = f);
    }

    goFetchFishers() {

    }

    filter(): void {
        console.log('FILTERING');

        const smartFilter = function(s, n) {
            if (n === null || n === undefined) {
                return -1;
            } else {
                return n.toLowerCase().indexOf(s.toLowerCase());
            }
        };

        if (this.searchboxText === '') {
            this.service.getFishers().then(f => this.fishers = f);
        } else {
            console.log(this.searchboxText);

            this.fishers = this.fishers.filter(
                item => smartFilter(this.searchboxText, item.FirstName) !== -1 ||
                        smartFilter(this.searchboxText, item.LastName) !== -1
            );
        }
    }

    goto(id: string): void {
        this.router.navigateByUrl('fisher/' + id);
    }
}
