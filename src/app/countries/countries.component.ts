import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CountryService } from '../country.service';
import { country } from '../interfaces/countries';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  
  countries: country[] = [];
  filteredCountries: country[] = [];
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private countryService: CountryService , private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.ngxService.start();
    this.countryService.getCountries()
      .subscribe((countries: country[]) => {
        if (countries) {
          this.countries = countries;
          this.filteredCountries = countries;
          console.log("countries :: ", countries);
          this.ngxService.stop();
        }
      });
  }

  filterCountries(region: string[]) {
    this.filteredCountries = [];
    if (region.length > 0) {
      for (var i = 0; i < region.length; i++) {
        let tempCountries = this.countries.filter(country => country.region == region[i]);
        for (let k = 0; k < tempCountries.length; k++) {
          this.filteredCountries.push(tempCountries[i]);
        }
      }
    } else {
      this.filteredCountries = this.countries;
    }
  }

  findCountryByName(event:any) {
    this.filteredCountries = this.filterCountriesByName(this.countries, event);
  }


  filterCountriesByName(countries: any[], searchText: string): any[] {
    console.log(countries);
    console.log(searchText);
    if (!countries) {
      return [];
    }
    if (!searchText) return countries;
    searchText = searchText.toLowerCase();
    return countries.filter(country => {
      return country.name.toLowerCase().includes(searchText);
    })
  }

  getSelectedRegion(event:any){
    console.log(event)
    this.filterCountries(event);
  }

}