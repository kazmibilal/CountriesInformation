import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { country } from './interfaces/countries';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http : HttpClient) { }

  getCountries() : Observable<country[]> {
    return this.http.get<country[]>(Constants.API_BACK_ENDPOINT, { });
  }
}
