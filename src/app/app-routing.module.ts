import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './partials/navbar/navbar.component';
import {ToolsComponent} from './components/tools/tools.component';
import {SearchComponent} from './components/search/search.component';
import {FisherDetailComponent} from './components/fisher-detail/fisher-detail.component';
import {FisherTripsComponent} from './partials/fisher-trips/fisher-trips.component';
import {CommunitiesComponent} from './components/communities/communities.component';
import {CommunitiesListComponent} from './components/communities-list/communities-list.component';
import {MessagingComponent} from './components/tools/messaging/messaging.component';
import {ToolsOverviewComponent} from './partials/tools-overview/tools-overview.component';
import {RegistrationsComponent} from './components/tools/registrations/registrations.component';
import {OdkComponent} from './components/tools/odk/odk.component';
import {FisherBioComponent} from './partials/fisher-bio/fisher-bio.component';
import {RegTodoComponent} from './components/tools/registrations/reg-todo/reg-todo.component';
import {RegRecentComponent} from './components/tools/registrations/reg-recent/reg-recent.component';
import {CommunityFishersComponent} from './components/communities/community-fishers/community-fishers.component';
import {LinksComponent} from './components/tools/links/links.component';
import {CommunitiesStatsComponent} from './components/communities/communities-stats/communities-stats.component';


const routes: Routes = [
    {
        // Default path
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'tools', component: ToolsComponent,
        children: [
            { path: '', redirectTo: 'messaging', pathMatch: 'full' },
            { path: 'messaging', component: MessagingComponent },
            { path: 'overview', component: ToolsOverviewComponent },
            { path: 'registrations', component: RegistrationsComponent,
                children: [
                    { path: '', redirectTo: 'todo', pathMatch: 'full' },
                    { path: 'todo', component: RegTodoComponent },
                    { path: 'recent', component: RegRecentComponent }
                ]
            },
            { path: 'odk', component: OdkComponent },
            { path: 'links', component: LinksComponent }
        ]
    },
    { path: 'search/fisher/:id', component: FisherDetailComponent,
        children: [
            {path: '', redirectTo: 'trips', pathMatch: 'full'},
            {path: 'trips', component: FisherTripsComponent},
            {path: 'bio', component: FisherBioComponent}
        ]
    },
    {
        path: 'communities',
        component: CommunitiesComponent,
        children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: CommunitiesListComponent},
            {path: 'stats', component: CommunitiesStatsComponent},
            {path: ':id/fishers', component: CommunityFishersComponent}
        ]
    }
    // ,
    // { path: '**', redirectTo: 'home' }
];

// Use hash in location routes, for hosting on heroku
const routeSettings = {
    useHash: true
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, routeSettings)
    ],
    declarations: [],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
