import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {FishersService} from '../../../../services/fishers/fishers.service';
import {Registration} from '../../../../objects/registration';

@Component({
    selector: 'app-reg-todo',
    templateUrl: './reg-todo.component.html',
    styleUrls: ['./reg-todo.component.scss']
})
export class RegTodoComponent implements OnInit {
    registrations: Registration[] = null;
    currentComment: Registration = null;

    constructor(private http: Http,
                private service: FishersService) {
    }

    ngOnInit() {
        this.service.getNewRegistrations().then(registrations => {
            // this.isLoading = false;
            this.registrations = registrations;
        });
    }

    beautifyDate(input): string {
        const parsedDate = (new Date(Date.parse(input)));
        return parsedDate.toDateString();
    }

    showComment(inputRegistration): void {
        console.log(inputRegistration.Id);
        // alert('Showing : ' + inputRegistration.Id);
        this.currentComment = inputRegistration;
    }

    commentSaveChanges(): void {
        this.currentComment = null;
    }

    commentCancel(): void {
        this.currentComment = null;
    }
}
