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
  page = 1;
  pageSize = 10;
  collectionSize: number;

  constructor(private countryService: CountryService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.ngxService.start();
    this.countryService.getCountries()
      .subscribe((countries: country[]) => {
        if (countries) {
          this.countries = countries;
          this.collectionSize = this.countries.length;
          this.filteredCountries = countries;
          console.log("countries :: ", countries);
          this.ngxService.stop();
        }
      });
  }

  filterCountriesByRegions(region: string[]) {
    this.filteredCountries = this.countries.filter(country => {
      return region.some(reg => country.region === reg);
    });
    this.collectionSize = this.filteredCountries.length;
    this.page = 1;
  }

  findCountryByName(event: any) {
    this.filteredCountries = this.filterCountriesByName(this.countries, event);

    this.collectionSize = this.filteredCountries.length;
    this.page = 1;
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

  getSelectedRegion(event: any) {
    console.log(event)
    this.filterCountriesByRegions(event);
  }

}
