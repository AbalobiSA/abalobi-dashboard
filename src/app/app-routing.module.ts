import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { ToolsComponent } from './components/tools/tools.component';
import { SearchComponent } from './components/search/search.component';
import { FisherDetailComponent } from './components/fisher-detail/fisher-detail.component';
import { FisherTripsComponent } from './partials/fisher-trips/fisher-trips.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { CommunitiesListComponent } from './components/communities-list/communities-list.component';
import { MessagingComponent } from './partials/messaging/messaging.component';
import { ToolsOverviewComponent } from './partials/tools-overview/tools-overview.component';
import { RegistrationsComponent } from './partials/registrations/registrations.component';
import {OdkComponent} from "./partials/odk/odk.component";



const routes: Routes = [
    {
        // Default path
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'tools',
        component: ToolsComponent,
        children: [
            {
                path: '',
                redirectTo: 'messaging',
                pathMatch: 'full'
            },
            {
                path: 'messaging',
                component: MessagingComponent
            },
            {
                path: 'overview',
                component: ToolsOverviewComponent
            },
            {
                path: 'registrations',
                component: RegistrationsComponent
            },
            {
                path: 'odk',
                component: OdkComponent
            }
        ]
    },
    {
        path: 'search/fisher/:id',
        component: FisherDetailComponent,
        children: [
            { path: '', redirectTo: 'trips', pathMatch: 'full' },
            { path: 'trips', component: FisherTripsComponent }
        ]
    },
    {
        path: 'communities',
        component:  CommunitiesComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: CommunitiesListComponent }
        ]
    }
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
    declarations: [  ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
