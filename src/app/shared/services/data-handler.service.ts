import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataLists } from "../../data/data-lists";
import { BookingInfo, Film, FilmScreeningPeriod, FilmSession, FilmSessionTime, ScreeningPeriod, Theater } from "../interfaces";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService extends DataService {

  getGenresList(): string[] {
    return DataLists.genres;
  }

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

  getFilmSessionsList(): FilmSession {
    return DataLists.filmsessions;
  }
  getFilmSessions(filmName: string): Observable<FilmSessionTime[]> {
    return of(DataLists.filmsessions[filmName]);
  }

  getScreeningPeriodList(): FilmScreeningPeriod {
    return DataLists.filmScreeningPeriod;
  }
  getScreeningPeriod(filmName: string): Observable<ScreeningPeriod[]> {
    return of(DataLists.filmScreeningPeriod[filmName]);
  }

  setSelectedPlaces(info: BookingInfo): Observable<boolean> {
    this.bookingInfo = info;
    return of(true);
  }
}
