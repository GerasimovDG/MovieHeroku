import { Component, OnInit } from "@angular/core";
import { Options } from "ng5-slider";
import { Film, Theater } from "../shared/interfaces";
import { DataHandlerService } from "../shared/services/data-handler.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit {
  private isCinemaDropdown: boolean = false;
  private isGenreDropdown: boolean = false;
  private isSortDown: boolean = null;

  private today: string = this.formatDate(new Date());
  private genreTitle: string = "Жанр";
  private cinemaTitle: string = "Кинотеатр";

  private genres: string[];
  private cinemas: Theater[];
  private films: Film[];
  private allFilms: Film[];

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

  // форматирует дату в строку
  formatDate(date: Date): string {
    const year = date.getFullYear();
    let MM: string = (date.getMonth() + 1) + "";
    let dd: string = "" + date.getDate();
    if (MM.length < 2) {
      MM = "0" + MM;
    }
    if (dd.length < 2) {
      dd = "0" + dd;
    }
    return [year, MM, dd].join("-");
  }

  // сортировка по рейтингу
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

  // показать нужную стрелочку у кнопки рейтинга (или не показывать вообще)
  getSortRatingClass(): string {
    if (this.isSortDown === null) {
      return "";
    }
    if (this.isSortDown) {
      return "dropdown-button_down";
    }
    return "dropdown-button_up";
  }

  // показать/скрыть выпадающий список
  getDropdownClass(isOpen: boolean): string {
    if (isOpen) {
      return "dropdown-button_up";
    }
    return "dropdown-button_down";
  }

  // вывести список фильмов по жанру
  showFilmsByGenre(genre: string): void {
    this.cinemaTitle = "Кинотеатр";
    this.minValue = 0;
    this.maxValue = 86399;
    this.isSortDown = null;

    if (genre.toLowerCase() === "Все жанры".toLowerCase()) {
      this.genreTitle = "Жанр";
      this.films = this.allFilms;
    } else {
      this.genreTitle = genre;
      this.films = this.allFilms.filter( film => {
        return film.genres.find( filmGenre => {
          return filmGenre.toLowerCase() === genre.toLowerCase();
        });
      });
    }
    this.isGenreDropdown = false;
  }

  // hideDropdown(isDropdown: boolean): void {
  //   setTimeout( () => {
  //     this.isGenreDropdown = false;
  //     this.isCinemaDropdown = false;
  //   }, 500);
  // }

  // поиск фильма по названию
  searchFilm(event: Event): void {
    const neededFilm: string = (<HTMLInputElement>event.target).value;

    this.films = this.allFilms.filter( film => film.name.toLowerCase().includes(neededFilm.toLowerCase()));
    if (!neededFilm.trim()) {
      this.films = this.allFilms;
    }
  }

  // вывести список фильмов из кинотеатра с названием name
  showFilmsByCinemaName(name: string): void {
    this.genreTitle = "Жанр";
    this.minValue = 0;
    this.maxValue = 86399;

    const theater = this.dataHandler.getCinemasList().find( cinema => {
      return cinema.name.toLowerCase() === name.toLowerCase();
    });
    this.films = theater.films;
    this.cinemaTitle = theater.name;
    this.isCinemaDropdown = false;
  }
  // вывести список всех фильмов
  showFilmsFromAllCinemas(): void {
    this.films = this.allFilms;
    this.cinemaTitle = "Кинотеатр";
    this.isCinemaDropdown = false;
  }

  // вывести список фильмов, которые идут в заданном диаппазоне времени
  showFilmsByTime(): void {
    this.isSortDown = null;
    this.genreTitle = "Жанр";
    this.cinemaTitle = "Кинотеатр";

    this.films = this.allFilms.filter(film => {
      if (this.dataHandler.getFilmSessions(film.name)) {
        return this.dataHandler.getFilmSessions(film.name).find(session => {
          return (session.time > this.minValue && session.time < this.maxValue );
        });
      }
    });
  }

  // вывести список фильмов по дате
  showFilmsByDate(event: Event): void {
    const inputValue = (<HTMLInputElement>event.target).value;
    if (!inputValue) {
      this.films = this.allFilms;
      return;
    }
    const inputDateTime = new Date(inputValue).getTime();

    this.films = this.allFilms.filter( film => {
      if (this.dataHandler.getScreeningPeriod(film.name)) {
        return this.dataHandler.getScreeningPeriod(film.name).find( period => {
          return (period.periodStart.getTime() <= inputDateTime && period.periodEnd.getTime() >= inputDateTime);
        });
      }
    });
  }
}
