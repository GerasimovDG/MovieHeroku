import { Component, OnInit } from "@angular/core";
import { Options } from "ng5-slider";
import { Film } from "../shared/interfaces";
import { DataHandlerService } from "../shared/services/data-handler.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit {
  private isCinemaDropdown: boolean = false;
  private isGenreDropdown: boolean = false;

  private genres: string[];
  private genreTitle: string = "Жанр";

  private cinemas: string[];

  private films: Film[];
  private allFilms: Film[];
  private isSortDown: boolean = null;


  minValue: number = 0;
  maxValue: number = 86399;
  options: Options = {
    floor: 0,
    ceil: 86399,
    translate: (value: number): string => {
      return this.formatSecs(value);
    }
  };

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) { s = "0" + s; }
    return s;
  }
  formatSecs(totalsecs: number): string {
    const hour = parseInt( (totalsecs / 3600) + "", 10) % 24;
    const min = parseInt( (totalsecs / 60) + "", 10) % 60;
    const secs = totalsecs % 60;

    return this.pad(hour, 2) + ":" + this.pad(min, 2) + ":" + this.pad(secs, 2);
  }

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.genres = this.dataHandler.getGenresList();
    this.cinemas = this.dataHandler.getCinemasList();
    this.films = this.dataHandler.getFilmsList();
    this.allFilms = this.films;
  }

  sortByRating(): void {
    if (this.isSortDown === null) {
      this.isSortDown = false;
    }
    this.isSortDown = !this.isSortDown;
    this.films.sort((first: Film, second: Film) => {
      if (this.isSortDown) {
        return  first.rating <= second.rating ? 1 : -1;
      }
      return first.rating >= second.rating ? 1 : -1;
    });
  }

  getSortRatingClass(): string {
    if (this.isSortDown === null) {
      return "";
    }
    if (this.isSortDown) {
      return "dropdown-button_down";
    }
    return "dropdown-button_up";
  }

  getDropdownClass(isOpen: boolean): string {
    if (isOpen) {
      return "dropdown-button_up";
    }
    return "dropdown-button_down";
  }

  showFilmsByGenre(genre: string): void {
    if (genre.toLowerCase() === "Все жанры".toLowerCase()) {
      this.genreTitle = "Жанр";
      this.films = this.allFilms;
      this.isGenreDropdown = false;
    } else {
      this.isGenreDropdown = false;
      this.genreTitle = genre;
      this.films = this.allFilms.filter( film => {
        return film.genres.find( filmGenre => {
          return filmGenre.toLowerCase() === genre.toLowerCase();
        });
      });
    }
  }

  // hideDropdown(isDropdown: boolean): void {
  //   setTimeout( () => {
  //     this.isGenreDropdown = false;
  //     this.isCinemaDropdown = false;
  //   }, 500);
  // }
}
