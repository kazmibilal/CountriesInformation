import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Input() allRegions: any;
  @Output() region: EventEmitter<String[]> = new EventEmitter<String[]>();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  regionCtrl = new FormControl();
  filteredRegions: Observable<string[]>;
  regions: string[] = [];

  @ViewChild('regionInput') regionInput: ElementRef<HTMLInputElement>;

  toppings = new FormControl();

  constructor() { 
  this.filteredRegions = this.regionCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allRegions.slice())
      );
  }

  ngOnInit(): void {
  }

  emitRegions(region: any) {
    this.region.emit(region);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.regions.push(event.option.viewValue);
    this.emitRegions(this.regions);
    this.regionInput.nativeElement.value = '';
    this.regionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRegions.filter((region: string) => region.toLowerCase().includes(filterValue));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.regions.push(value);
      this.emitRegions(this.regions);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.regionCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.regions.indexOf(fruit);

    if (index >= 0) {
      this.regions.splice(index, 1);
      this.emitRegions(this.regions);
    }
  }

}
