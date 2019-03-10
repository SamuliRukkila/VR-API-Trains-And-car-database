import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VrService {

  public baseurl = 'https://rata.digitraffic.fi/api/v1/';

  constructor(private http: HttpClient) {}

  // Gets all stations from VR-API
  public getStations(): Observable<any> {
    return this.http.get<any>(this.baseurl + 'metadata/stations');
  }

  // Get all trains in specific station (arriving/leaving according to parameter)
  public searchTrains(station: string, trainToggle: string): Observable<any> {
    return this.http.get(`${this.baseurl}live-trains/station/${station}?${trainToggle}`);
  }

}
