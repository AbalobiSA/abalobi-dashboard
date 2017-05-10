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

        if (this.searchboxText === '') {
            this.service.getFishers().then(f => this.fishers = f);
        } else {
            this.fishers = this.fishers.filter(
                item => item.FirstName.toLocaleLowerCase().indexOf(this.searchboxText.toLocaleLowerCase()) !== -1 ||
                item.LastName.toLocaleLowerCase().indexOf(this.searchboxText.toLocaleLowerCase()) !== -1
            );
        }
    }

    goto(id: string): void {
        this.router.navigateByUrl('fisher/' + id);
    }
}
