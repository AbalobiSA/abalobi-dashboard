import {Component, OnInit} from '@angular/core';

import {NotificationsService} from 'angular2-notifications/dist';

import {FishersService} from '../../../services/fishers/fishers.service';

@Component({
    selector: 'app-communities-stats',
    templateUrl: './communities-stats.component.html',
    styleUrls: ['./communities-stats.component.scss']
})

export class CommunitiesStatsComponent implements OnInit {

    showGraph = false;

    startDate: string = null;
    endDate: string = null;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType = 'bar';
    public barChartLegend = false;
    public barChartColors: any[] = [
        // Each entry in the array corresponds to a column in the graph
        {backgroundColor: ['#e84351 ', '#434a54', '#3ebf9b', '#4d86dc', '#f3af37']}
    ];

    public barChartData: any[] = [
        {data: [], label: ''}
    ];

    constructor(private service: FishersService,
                private notiService: NotificationsService) {}

    ngOnInit() {
        this.service.getCommunitiesRecentTrips().then(items => {

            for (let i = 0; i < items.json().length; i = i + 1) {
                this.barChartLabels.push(items.json()[i]['Name']);
                this.barChartData[0]['data'].push(items.json()[i]['expr0']);
            }

            this.showGraph = true;
        }).catch(err => {
            this.showErrorNotification(err);
        });
    }

    showErrorNotification(message: string): void {
        this.notiService.error(
            'Error',
            message,
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false
            }
        );
    }

    filter(): void {
        this.showGraph = false;

        // Clear current graph data
        this.barChartLabels = [];
        this.barChartData = [
            {data: [], label: ''}
        ];

        let startDate = null;
        let endDate = null;

        if (this.endDate !== null && this.endDate !== undefined && this.endDate !== '') {
            endDate = new Date(this.endDate);
        }

        if (this.startDate !== null && this.startDate !== undefined && this.startDate !== '') {
            startDate = new Date(this.startDate);
        }

        if (startDate === null && endDate === null) {
            this.service.getCommunitiesRecentTrips().then(items => {

                for (let i = 0; i < items.json().length; i = i + 1) {
                    this.barChartLabels.push(items.json()[i]['Name']);
                    this.barChartData[0]['data'].push(items.json()[i]['expr0']);
                }

                this.showGraph = true;
            }).catch(err => {
                this.showErrorNotification(err);
            });
        } else {
            this.service.getCommunitiesRecentFilteredTrips(startDate, endDate).then(items => {
                for (let i = 0; i < items.json().length; i = i + 1) {
                    this.barChartLabels.push(items.json()[i]['Name']);
                    this.barChartData[0]['data'].push(items.json()[i]['expr0']);
                }

                this.showGraph = true;
            }).catch(err => {
                this.showErrorNotification(err);
            });
        }
    }
}
