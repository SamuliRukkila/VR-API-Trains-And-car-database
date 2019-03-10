import { Component, OnInit } from '@angular/core';
import { VrService } from './vr.service';

import { Train } from './train';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Boolean value, tells if searching for arriving or departing trains
  public showTrainsArriving = true;

  // Two arrays in which trains will be placed
  public arrivedTrains: Train[] = [];
  public leavingTrains: Train[] = [];
  // All stations found from VR-API
  public stations = [];

  // Stations which user has found through search-bar
  public searchedStations: Array<string>;
  // If any trains were found in search
  public trainsFound = true;
  // User's selected station of choice
  public selectedStation = '';

  // Private instance of service which calls HTTP-requests for VR-API
  constructor(private vrService: VrService) {}

  ngOnInit() {
    this.getAllStations();
  }

  // Toggles between seeing arriving trains and departing ones
  public toggle(): void {
    this.showTrainsArriving = !this.showTrainsArriving;
  }


  // Gets called from template, converts station short-names into more readable names
  public convertStation(shortStation: string): string {
    let longStation: string;
    this.stations.forEach(station => {
      if (station.code === shortStation) {
        longStation = station.name.slice(-5) === 'asema' ? station.name.slice(0, -5) : station.name;
        return;
      }
    });
    return longStation;
  }


  // Gets all stations from VR-API
  public getAllStations(): void {
    this.vrService.getStations().subscribe(res => {
      res.forEach(station => {
        this.stations.push({ name: station.stationName, code: station.stationShortCode });
      });
    });
  }


  // Searches for stations by user input. Found stations will be printed to the user
  public searchStations(value: string): void {
    this.trainsFound = true;
    this.searchedStations = [];
    if (value) {
      this.stations.forEach(station => {
        if (station.name.toUpperCase().includes(value.toUpperCase())) {
          this.searchedStations.push(station);
        }
      });
    }
  }


  // After user has successfully selected a station this function will do
  // two HTTP-search queries to VR-API - one focusing on arriving trains
  // to that specific station and another one to departing ones.
  public searchTrains(station?: string, stationName?: string): void {

    this.selectedStation = stationName;
    this.searchedStations = [];
    this.arrivedTrains = [];
    this.leavingTrains = [];

    this.vrService.searchTrains(station, 'arriving_trains=10&arrived_trains=1').subscribe(res => {
      this.filterTrains(res, station, true);
    });

    this.vrService.searchTrains(station, 'departing_trains=10&departed_trains=1').subscribe(res => {
      this.filterTrains(res, station, false);
    });

  }


  // Filters JSON-data received from VR-API. Gets called two times by other function
  // (arriving ones and leaving ones).
  public filterTrains(trains, selectedStation: string, arrivingTrains): void {

    // If any of the trains are non-passenger focusing ones
    const filterTrains = trains.filter(train => train.trainType !== 'T' &&
      train.trainType !== 'TYO' && train.trainType !== 'VET');
    // If none trains were found by passenger filter
    if (filterTrains.length < 1) {
      this.trainsFound = false;
    } else {
      // Temporary variable for each train in array of objects
      filterTrains.forEach(train => {
        const readyTrain = new Train();
        readyTrain.name = `${train.trainType} ${train.trainNumber}`;
        readyTrain.starting_station = train.timeTableRows[0].stationShortCode;
        readyTrain.ending_station = train.timeTableRows[train.timeTableRows.length - 1].stationShortCode;
        train.timeTableRows.forEach(station => {
          if (station.stationShortCode === selectedStation && station.type === 'ARRIVAL' && arrivingTrains ||
              station.stationShortCode === selectedStation && station.type === 'DEPARTURE' && !arrivingTrains) {
              // Initiate a new date from received date (it is 2h behind in time). After a proper date has been
              // established it'll be put to variable.
              const scheduledDate = new Date(station.scheduledTime);
              const actualDate = new Date(station.actualTime);
              // Slice only the time from proper date (both scheduled and actual times)
              readyTrain.time = scheduledDate.toString().slice(16, 21);
              readyTrain.actual_time = actualDate.toString().slice(16, 21);
              readyTrain.cancelled = station.cancelled;
              // Push ready variable to a global array which'll be shown template.
              if (arrivingTrains) {
                this.arrivedTrains.push(readyTrain);
                console.log(this.arrivedTrains);
              } else {
                this.leavingTrains.push(readyTrain);
              }
          }
        });
      });
    }
  }

}
