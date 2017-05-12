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
}
