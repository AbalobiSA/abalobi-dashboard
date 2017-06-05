import { Component, OnInit } from '@angular/core';

import { FishersService } from '../../services/fishers/fishers.service';
import { Registration } from '../../objects/registration';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    registrations: Registration[] = null;
    calc_new_registrations = 0;

    constructor(private service: FishersService) {

    }

    ngOnInit() {
        this.service.getNewRegistrations().then(registrations => {
            this.registrations = registrations;
            this.calculateNewRegistrations();
        });
    }

    calculateNewRegistrations() {
        let counter = 0;

        for (const i in this.registrations) {
            if (true === true) {
                // Do some stuff
            }

            counter++;
        }

        this.calc_new_registrations = counter;
    }

    debugLogin(): void {
        console.log("AUTH INFO: " + localStorage.getItem('access_token'));
        console.log("AUTH INFO: " + localStorage.getItem('id_token'));
        console.log("AUTH INFO: " + localStorage.getItem('expires_at'));
    }
}


/*============================================================================
    Carl's Ember Code
 ============================================================================*/


// this.set('consoleInformation', "Request Created! Awaiting Response...");
// var consoleBuffer = "";
// consoleBuffer = this.get('consoleInformation');
// // Assign handlers immediately after making the request,
// // and remember the jqxhr object for this request
// var scope = this;
//
// var jqxhr = Ember.$.get("http://197.85.186.65:8080/odk2publisher", function() {
//     consoleBuffer += "\n" + "success";
//     setConsole(consoleBuffer, scope);
// })
//     .done(function(response) {
//         // consoleBuffer += "\n" + "second success";
//         consoleBuffer += "\n" + response.data;
//         setConsole(consoleBuffer, scope);
//     })
//     .fail(function(response) {
//         // consoleBuffer += "\n" + "error";
//         consoleBuffer += "\n" + JSON.stringify(response, null, 4);
//         setConsole(consoleBuffer, scope);
//     })
//     .always(function() {
//         consoleBuffer += "\n" + "finished";
//         setConsole(consoleBuffer, scope);
//     });
//
// function setConsole (printMe, scope){
//     scope.set("consoleInformation", printMe);
// }
//
//
//
// // Perform other work here ...
//
// // Set another completion function for the request above
// jqxhr.always(function() {
//     // alert("second finished");
// });
