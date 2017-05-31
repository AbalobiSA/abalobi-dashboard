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
    commentLoading: boolean = false;

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
        this.commentLoading = true;
        this.service.updateRegistration(this.currentComment).then(response => {

            console.log(response);
            console.log(JSON.stringify(JSON.parse(JSON.stringify(response)), null, 4));

            if (JSON.parse(JSON.stringify(response)).statusCode === 200) {
                alert('Updated Successfully!');
                this.commentLoading = false;
            } else {
                alert('Update failed!');
                this.commentLoading = false;
            }
        });
    }

    commentCancel(): void {
        this.currentComment = null;
    }
}
