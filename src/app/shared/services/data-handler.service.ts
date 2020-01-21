import { Injectable } from "@angular/core";
import { DataLists } from "../../data/data-lists";

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
}
