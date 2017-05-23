import { Component, OnInit } from '@angular/core';

import { Fisher } from '../../objects/fisher';
import { FishersService } from '../../services/fishers/fishers.service';
import {CompleterData, CompleterItem, CompleterService} from 'ng2-completer';

@Component({
    selector: 'app-messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

    searchStr: string;
    fishers: Fisher[];

    cellnum: string;

    protected dataService: CompleterData;

    constructor(private service: FishersService, private completerService: CompleterService) {

    }

    ngOnInit() {
        this.service.getFishers().then(fishers => {
            this.fishers = fishers;

            this.dataService = this.completerService.local(this.fishers, 'FirstName, LastName, contact_mobile_num__c', 'FirstName').descriptionField('LastName');
        }).catch(() => {
            alert('Error occurred while getting fishers');
        });
    }

    sendMessage(): void {
        alert('Message sent!');
    }

    test(selected: CompleterItem): void {
        // TODO: Make so that this uses the fisher's cellphone number
        this.cellnum = selected ? selected.originalObject.contact_mobile_num__c
            ? selected.originalObject.contact_mobile_num__c : 'No number on record' : null;
    }

}
