import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { FishersService } from '../../../../services/fishers/fishers.service';
import { Registration } from '../../../../objects/registration';

@Component({
  selector: 'app-reg-recent',
  templateUrl: './reg-recent.component.html',
  styleUrls: ['./reg-recent.component.scss']
})
export class RegRecentComponent implements OnInit {
    registrations: Registration[] = null;

    constructor(
        private http: Http,
        private service: FishersService
    ) { }

    ngOnInit() {
        this.service.getRecentRegistrations().then(registrations => {
            // this.isLoading = false;
            this.registrations = registrations;
        });
    }

    beautifyDate(input): string {
        const parsedDate = (new Date(Date.parse(input)));
        return parsedDate.toDateString();
    }
}
