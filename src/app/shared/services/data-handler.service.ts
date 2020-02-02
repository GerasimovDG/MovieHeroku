import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataLists } from "../../data/data-lists";
import { BookingInfo, Film, FilmScreeningPeriod, FilmSession, FilmSessionTime, ScreeningPeriod, Theater } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService {

  private bookingInformation: BookingInfo;

  get bookingInfo(): BookingInfo {
    return this.bookingInformation;
  }
  set bookingInfo(info: BookingInfo) {
    this.bookingInformation = info;
  }

  getGenresList(): string[] {
    return DataLists.genres;
  }

  getCinemasList(): Theater[] {
    return DataLists.cinemas;
  }

  getFilmsList(): Observable<Film[]> {
    return of(DataLists.films);
  }
  // getFilmsList(): Observable<Film[]> {
  //   return this.http.get<Film[]>(environment.apiUrl + "/films");
  // }

  getFilmByID(id: number): Observable<Film> {
    return of(DataLists.films.find( film => {
      return film.id.toString() === id.toString();
    }));
    // return new Observable<Film>( (observer: Observer<Film>) => {
    //   const resfilm: Film = DataLists.fimls.find( film => film.id.toString() === id.toString());
    //   observer.next(resfilm);
    // });

  }

  getFilmSessionsList(): FilmSession {
    return DataLists.filmsessions;
  }
  getFilmSessions(filmName: string): FilmSessionTime[] {
    return DataLists.filmsessions[filmName];
  }

  getScreeningPeriodList(): FilmScreeningPeriod {
    return DataLists.filmScreeningPeriod;
  }
  getScreeningPeriod(filmName: string): ScreeningPeriod[] {
    return DataLists.filmScreeningPeriod[filmName];
  }
}
