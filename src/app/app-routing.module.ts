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
        component: ToolsComponent
    },
    {
        path: 'search/fisher/:id',
        component: FisherDetailComponent,
        children: [
            { path: '', redirectTo: 'trips', pathMatch: 'full' },
            { path: 'trips', component: FisherTripsComponent }
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
