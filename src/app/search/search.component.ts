import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {

  @Output() searchText : EventEmitter<String> = new EventEmitter<String>();
  searchByName="";

  constructor() { }

  ngOnInit(): void {
  }


  outputSearchText(){
    this.searchText.emit(this.searchByName);
  }

}
