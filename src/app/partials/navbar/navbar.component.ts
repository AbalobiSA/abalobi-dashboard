import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';

import { AuthService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
      public auth: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
  }
}
