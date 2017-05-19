import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

/*============================================================================
 Route Imports
 ============================================================================*/

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { ToolsComponent } from './components/tools/tools.component';
import { FisherBlockComponent } from './partials/fisher-block/fisher-block.component';
import { FisherDetailComponent } from './components/fisher-detail/fisher-detail.component';
import {FishersService} from './services/fishers/fishers.service';
import { FisherTripsComponent } from './partials/fisher-trips/fisher-trips.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { CommunitiesListComponent } from './components/communities-list/communities-list.component';
import { AuthService } from './services/auth/auth-service.service';

import { KeysPipe } from './pipes/key-pipe';
import { MessagingComponent } from './partials/messaging/messaging.component';
import { ToolsOverviewComponent } from './partials/tools-overview/tools-overview.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        SearchComponent,
        ToolsComponent,
        FisherBlockComponent,
        FisherDetailComponent,
        FisherTripsComponent,
        CommunitiesComponent,
        CommunitiesListComponent,

        KeysPipe,

        MessagingComponent,

        ToolsOverviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        Angular2FontAwesomeModule
    ],
    providers: [FishersService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
