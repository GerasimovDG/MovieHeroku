import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookingInfo, Film, FilmSessionTime, ScreeningPeriod, Theater, User } from "../interfaces";

@Injectable({providedIn: "root"})
export abstract class AuthDataService {

  abstract login(user: User): Observable<boolean>;
}

export abstract class DataService {
  protected bookingInformation: BookingInfo;

  get bookingInfo(): BookingInfo {
    return this.bookingInformation;
  }
  set bookingInfo(info: BookingInfo) {
    this.bookingInformation = info;
  }

  abstract setSelectedPlaces(info: BookingInfo): Observable<boolean>;
  abstract getFilmsList(): Observable<Film[]>;
  abstract getFilmByID(id: number): Observable<Film>;
  abstract getCinemasList(): Observable<Theater[]>;
  abstract getFilmSessions(filmName: string): Observable<FilmSessionTime[]>;
  abstract getScreeningPeriod(filmName: string): Observable<ScreeningPeriod[]>;

}
