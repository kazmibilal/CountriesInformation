import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Input() regions: any;
  @Output() region: EventEmitter<String[]> = new EventEmitter<String[]>();

  toppings = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  emitRegions(event: any) {
    this.region.emit(event.value);
  }



}
