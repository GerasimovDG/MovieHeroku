import { Injectable } from "@angular/core";
import { DataLists } from "../../data/data-lists";
import { Film } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService {

  getGenresList(): string[] {
    return DataLists.genres;
  }

  getCinemasList(): string[] {
    return DataLists.cinemas;
  }

  getFilmsList(): Film[] {
    return DataLists.fimls;
  }
}
