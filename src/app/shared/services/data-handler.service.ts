import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataLists } from "../../data/data-lists";
import { Film, Theater } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService {

  getGenresList(): string[] {
    return DataLists.genres;
  }

  getCinemasList(): Theater[] {
    return DataLists.cinemas;
  }

  getFilmsList(): Film[] {
    return DataLists.fimls;
  }

  getFilmByID(id: number): Observable<Film> {
    return of(DataLists.fimls.find( film => {
      return film.id.toString() === id.toString();
    }));
    // return new Observable<Film>( (observer: Observer<Film>) => {
    //   const resfilm: Film = DataLists.fimls.find( film => film.id.toString() === id.toString());
    //   observer.next(resfilm);
    // });

  }
}
