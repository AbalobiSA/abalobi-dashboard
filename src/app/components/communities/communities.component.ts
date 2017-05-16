import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FishersService } from '../../services/fishers/fishers.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})

export class CommunitiesComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private location: Location
    ) { }

    ngOnInit() {

    }

    private goBack(): void {
        this.location.back();
    }
}
