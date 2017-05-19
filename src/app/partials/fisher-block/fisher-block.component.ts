import { Component, OnInit, Input } from '@angular/core';

import { Fisher } from '../../objects/fisher';

@Component({
    selector: 'app-fisher-block',
    templateUrl: './fisher-block.component.html',
    styleUrls: ['./fisher-block.component.scss']
})
export class FisherBlockComponent implements OnInit {

    @Input() fisher: Fisher;



    constructor() { }

    ngOnInit() {
    }


    private processName(input): string {
        const strings = input.toString().split(' ');
        let compilation = '';

        for (let i in strings) {
            compilation += strings[i].charAt(0).toUpperCase() + strings[i].substring(1);
            if (i !== strings.length) {
                compilation += ' ';
            }
        }

        return compilation;
    }
}
