import { Component, OnInit } from '@angular/core';

import { Fisher } from '../../../objects/fisher';
import { FishersService } from '../../../services/fishers/fishers.service';
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
    messageBody: string;

    dataService: CompleterData;

    constructor(private service: FishersService, private completerService: CompleterService) {

    }

    ngOnInit() {
        this.service.getFishers().then(fishers => {
            this.fishers = fishers;
            this.dataService = this.completerService.local(this.fishers, 'FirstName,LastName', 'FirstName').descriptionField('LastName');
        }).catch(() => {
            alert('Error occurred while getting fishers');
        });
    }

    sendMessage(): void {
        // alert('Message sent!');
        this.service.sendSMS({
            toNumber: this.cellnum,
            messageBody: this.messageBody
        }).then(response => {
            console.log('RESPONSE: ' + JSON.stringify(response, null, 4));
            alert(JSON.parse(JSON.stringify(response)).message);
        });
    }

    test(selected: CompleterItem): void {
        this.cellnum = selected ? selected.originalObject.contact_mobile_num__c
            ? selected.originalObject.contact_mobile_num__c : 'No number on record' : null;
    }

}
