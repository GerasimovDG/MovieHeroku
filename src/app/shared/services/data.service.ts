import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookingInfo, Film, FilmSessionTime, ScreeningPeriod, Theater, User } from "../interfaces";

@Injectable({providedIn: "root"})
export abstract class AuthDataService {

  abstract register(user: User): Observable<boolean>;
  abstract login(user: User): Observable<User>;
}

export abstract class DataService {
  protected bookingInformation: BookingInfo;
  protected currUser: User;

  get bookingInfo(): BookingInfo {
    return this.bookingInformation;
  }
  set bookingInfo(info: BookingInfo) {
    this.bookingInformation = info;
  }

  get currentUser(): User {
    return this.currUser;
  }
  set currentUser(user: User) {
    this.currUser = user;
  }

  abstract getCurrentUser(login: string): Observable<User>;
  abstract setSelectedPlaces(info: BookingInfo): Observable<boolean>;
  abstract getFilmsList(): Observable<Film[]>;
  abstract getFilmByID(id: number): Observable<Film>;
  abstract getCinemasList(): Observable<Theater[]>;
  abstract getFilmSessions(filmName: string): Observable<FilmSessionTime[]>;
  abstract getScreeningPeriod(filmName: string): Observable<ScreeningPeriod[]>;

}
