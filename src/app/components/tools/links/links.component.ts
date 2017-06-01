import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

    GUIDE_OPEN: boolean = false;

    constructor() {
    }

    ngOnInit() {

    }

    toggleGuide(): void {
        switch (this.GUIDE_OPEN) {
            case true:
                this.GUIDE_OPEN = false;
                break;
            case false:
                this.GUIDE_OPEN = true;
                break;
        }
    }

}
