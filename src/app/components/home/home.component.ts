import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { FishersService } from '../../services/fishers/fishers.service';
import { Registration } from '../../objects/registration';

import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    consoleText = '';
    registrations: Registration[] = null;
    calc_new_registrations = 0;

    constructor(
        private http: Http,
        private service: FishersService
    ) {

    }

    ngOnInit() {
        this.clearConsole();
        this.service.getNewRegistrations().then(registrations => {
            // this.isLoading = false;
            this.registrations = registrations;
            this.calculateNewRegistrations();
        });
    }

    clearConsole() {
        this.consoleText = 'abalobi@server: ';
    }

    appendConsole(s: any, leadingTab: boolean) {
        if (leadingTab) {
            this.consoleText += ('\t' + s + '\n');
        } else {
            this.consoleText += (s + '\n');
        }
    }

    createRequest() {

        this.appendConsole('Run ODK Publisher selected', false);
        this.appendConsole('Request Created! Awaiting Response...', true);

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

    downloadFisherForms() {

        function base64toBlob(base64Data, contentType) {
            contentType = contentType || '';

            const sliceSize = 1024;
            const byteCharacters = atob(base64Data);
            const bytesLength = byteCharacters.length;
            const slicesCount = Math.ceil(bytesLength / sliceSize);
            const byteArrays = new Array(slicesCount);

            for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                const begin = sliceIndex * sliceSize;
                const end = Math.min(begin + sliceSize, bytesLength);

                const bytes = new Array(end - begin);
                for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }

                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }

            return new Blob(byteArrays, {type: contentType});
        }

        this.appendConsole('Download Fisher Forms selected', false);
        this.appendConsole('Preparing your download! Please wait...', true);

        this.http.get('http://197.85.186.65:8080/downloadFisherForms').toPromise().then(resp => {
            this.appendConsole('Data retrieved. Processing...', true);

            try {
                const zipFileBuffer = resp.json().zipfile;
                const zip = new JSZip();

                // this.appendConsole(JSON.stringify(zipFileBuffer, null, 4), true);

                // Generate Filename
                // ODK_Fisher_form_2016-12-15_09h25.zip
                const today = new Date();
                let returnMe = 'ODK_Fisher_form_'
                    + today.toLocaleDateString('en-ZA') + '_'
                    + today.getHours() + 'h'
                    + today.getMinutes() + 'm'
                    + today.getSeconds() + 's' + '.zip';

                returnMe = returnMe.replace(new RegExp('/', 'g'), '-');
                this.appendConsole('Downloading file as ' + returnMe, true);

                FileSaver.saveAs(base64toBlob(zipFileBuffer, 'application/zip'), returnMe);
                // FileSaver.saveAs(new Blob(zipFileBuffer, {type: 'application/zip'}), returnMe);

                this.appendConsole('Download complete', true);
                this.appendConsole('abalobi@server: ', true);
            } catch (e) {
                this.appendConsole('==== ERROR ====', true);
                this.appendConsole(e, true);
                this.appendConsole('===============', true);

                console.log(e);
            }
        }).catch(err => {
            this.appendConsole('==== ERROR ====', true);
            this.appendConsole(err, true);
            this.appendConsole('===============', true);
        });
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
