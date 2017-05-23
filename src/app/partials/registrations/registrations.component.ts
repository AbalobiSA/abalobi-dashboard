import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { FishersService } from '../../services/fishers/fishers.service';
import { Registration } from '../../objects/registration';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})

export class RegistrationsComponent implements OnInit {

    registrations: Registration[] = null;

  constructor(
      private http: Http,
      private service: FishersService
  ) { }

  ngOnInit() {
      this.service.getNewRegistrations().then(registrations => {
          // this.isLoading = false;
          this.registrations = registrations;
      });
  }

}
