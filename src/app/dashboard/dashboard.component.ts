import { Component, OnDestroy, OnInit } from "@angular/core";
import { Options } from "ng5-slider";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { Film, Theater } from "../shared/interfaces";
import { DataService } from "../shared/services/data.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  /** @internal */
  public isCinemaDropdown: boolean = false;
  /** @internal */
  public isGenreDropdown: boolean = false;
  private isSortDown: boolean = null;

  private today: string = this.formatDate(new Date());
  /** @internal */
  public genreTitle: string = "Жанр";
  /** @internal */
  public cinemaTitle: string = "Кинотеатр";

  /** @internal */
  public genres: string[] = [];
  /** @internal */
  public cinemas: Theater[];
  /** @internal */
  public films: Film[];
  private allFilms: Film[];

  filmsList$: Subscription;
  subscriptions$: Subscription = new Subscription();
  /** @internal */
  public loading: boolean = false;

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

  constructor(private dataHandler: DataService) {
  }

  ngOnInit(): void {
    this.loading = true;
    // this.genres = this.dataHandler.getGenresList();
    this.dataHandler.getCinemasList().pipe(take(1)).subscribe( cinemaList => {
      this.cinemas = cinemaList;
    });
    this.subscriptions$.add(this.dataHandler.getFilmsList().subscribe( films => {
      this.films = films;
      this.allFilms = this.films;
      this.allFilms.forEach( film => {
        // слияние жанров без повторений в один список.
        this.genres = [ ...new Set([...this.genres, ...film.genres])];
      });
      this.loading = false;
    }));
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

    // const theater = this.dataHandler.getCinemasList().find( cinema => {
    //   return cinema.name.toLowerCase() === name.toLowerCase();
    // });
    this.subscriptions$.add(this.dataHandler.getCinemasList().subscribe( cinemaList => {
      const theater = cinemaList.find( cinema => {
        return cinema.name.toLowerCase() === name.toLowerCase();
      });
      this.films = theater.films;
      this.cinemaTitle = theater.name;
      this.isCinemaDropdown = false;
    }));
    // this.films = theater.films;
    // this.cinemaTitle = theater.name;
    // this.isCinemaDropdown = false;
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

    // this.films = this.allFilms.filter(film => {
    //   if (this.dataHandler.getFilmSessions(film.name)) {
    //     return this.dataHandler.getFilmSessions(film.name).find(session => {
    //       return (session.time > this.minValue && session.time < this.maxValue );
    //     });
    //   }
    // });
    this.films = [];
    this.allFilms.forEach( film => {
      this.subscriptions$.add(this.dataHandler.getFilmSessions(film.name).subscribe( sessions => {
        const filmSession = sessions.find( session => {
          return (session.time > this.minValue && session.time < this.maxValue );
        });
        if (filmSession) {
          this.films.push(film);
        }
      }));
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

    // this.films = this.allFilms.filter( film => {
    //   if (this.dataHandler.getScreeningPeriod(film.name)) {
    //     return this.dataHandler.getScreeningPeriod(film.name).find( period => {
    //       return (period.periodStart.getTime() <= inputDateTime && period.periodEnd.getTime() >= inputDateTime);
    //     });
    //   }
    // });
    this.films = [];
    this.allFilms.forEach( film => {
      this.subscriptions$.add(this.dataHandler.getScreeningPeriod(film.name).subscribe( periodList => {
        const isFoundPeriod = periodList.find( period => {
          return (period.periodStart.getTime() <= inputDateTime && period.periodEnd.getTime() >= inputDateTime);
        });
        if (isFoundPeriod) {
          this.films.push(film);
        }
      }));
    });
  }

  showAllFilms(): void {
    this.films = this.allFilms;
    this.cinemaTitle = "Кинотеатр";
    this.genreTitle = "Жанр";
    this.isCinemaDropdown = false;
    this.isGenreDropdown = false;
  }

  ngOnDestroy(): void {
    // if (this.filmsList$) {
    //   this.filmsList$.unsubscribe();
    //   this.filmsList$ = null;
    // }
    if (this.subscriptions$) {
      this.subscriptions$.unsubscribe();
      this.subscriptions$ = null;
    }
  }
}
