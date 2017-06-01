import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { Ng2CompleterModule } from 'ng2-completer';

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
import { FishersService } from './services/fishers/fishers.service';
import { FisherTripsComponent } from './partials/fisher-trips/fisher-trips.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { CommunitiesListComponent } from './components/communities-list/communities-list.component';
import { AuthService } from './services/auth/auth-service.service';
import { DeveloperSettingsService } from './services/settings/developer-settings.service';

import { KeysPipe } from './pipes/key-pipe';
import { MessagingComponent } from './components/tools/messaging/messaging.component';
import { ToolsOverviewComponent } from './partials/tools-overview/tools-overview.component';
import { RegistrationsComponent } from './components/tools/registrations/registrations.component';
import { OdkComponent } from './components/tools/odk/odk.component';
import { FisherBioComponent } from './partials/fisher-bio/fisher-bio.component';
import { RegTodoComponent } from './components/tools/registrations/reg-todo/reg-todo.component';
import { RegRecentComponent } from './components/tools/registrations/reg-recent/reg-recent.component';
import { CommunityFishersComponent } from './components/communities/community-fishers/community-fishers.component';
import { LinksComponent } from './components/tools/links/links.component';

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

        ToolsOverviewComponent,

        RegistrationsComponent,

        OdkComponent,

        FisherBioComponent,

        RegTodoComponent,

        RegRecentComponent,

        CommunityFishersComponent,

        LinksComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        Angular2FontAwesomeModule,
        Ng2CompleterModule
    ],
    providers: [FishersService, AuthService, DeveloperSettingsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
