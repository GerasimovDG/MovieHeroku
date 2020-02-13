import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataLists } from "../../data/data-lists";
import { BookingInfo, Film, FilmSessionTime, ScreeningPeriod, Theater, User } from "../interfaces";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService extends DataService {

  getCinemasList(): Observable<Theater[]> {
    return of(DataLists.cinemas);
  }

  getFilmsList(): Observable<Film[]> {
    return of(DataLists.films);
  }

  getFilmByID(id: number): Observable<Film> {
    return of(DataLists.films.find( film => {
      return film.id.toString() === id.toString();
    }));
  }

  getFilmSessions(filmName: string): Observable<FilmSessionTime[]> {
    return of(DataLists.filmsessions[filmName]);
  }

  getScreeningPeriod(filmName: string): Observable<ScreeningPeriod[]> {
    return of(DataLists.filmScreeningPeriod[filmName]);
  }

  setSelectedPlaces(info: BookingInfo): Observable<boolean> {
    this.bookingInfo = info;
    return of(true);
  }

  getCurrentUser(login: string): Observable<User> {
    return of(DataLists.users.find( item =>  item.login === login));
  }
}
