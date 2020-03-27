import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Options } from "ng5-slider";
import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { Film } from "../shared/interfaces";
import { GetCinemaList, GetFilmByTimeInterval, GetFilmsList, GetScreeningPeriodList, SetCurrentFilmsList, SetMaxValueTime, SetMinValueTime } from "../store/actions/films.actions";
import { selectFilmsState } from "../store/selectors/films.selector";
import { IAppState } from "../store/state/app.state";
import { IFilmsState } from "../store/state/films.state";


export enum CONSTS {
  CINEMA_NAME = "Кинотеатр",
  GENRE_NAME = "Жанр",
  MIN_TIME = 0,
  MAX_TIME = 86399,
}

@Component({
  selector: "app-dashboard",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  /** @internal */
  public isCinemaDropdown: boolean = false;
  /** @internal */
  public isGenreDropdown: boolean = false;
  private isSortDown: boolean = null;

  /** @internal */
  public today: string = this.formatDate(new Date());
  /** @internal */
  public genreTitle: string = "Жанр";
  /** @internal */
  public cinemaTitle: string = "Кинотеатр";

  private allFilms: Film[];

  subscriptions$: Subscription = new Subscription();
  public filmsState$: Observable<IFilmsState>;
  private isFirstStart: boolean = true;
  /** @internal */
  public dateValue: string;

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

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.filmsState$ = this.store.pipe(select(selectFilmsState));
    this.store.dispatch(new GetCinemaList());
    this.store.dispatch(new GetFilmsList());

    this.subscriptions$.add(this.filmsState$.subscribe( state => {
      if (state.films.length && this.isFirstStart) {
        this.allFilms = JSON.parse(JSON.stringify(state.films));
        this.store.dispatch(new SetCurrentFilmsList(this.allFilms));

        this.isFirstStart = false;
        const nowDateStr = this.formatDate(new Date());
        this.selectFilmsByDate(nowDateStr);
      }
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
    this.filmsState$.pipe(take(1)).subscribe( state => {
      const rFilms = JSON.parse(JSON.stringify(state.currentFilms));
      rFilms.sort((first: Film, second: Film) => {
        if (this.isSortDown) {
          return  first.rating <= second.rating ? 1 : -1;
        }
        return first.rating >= second.rating ? 1 : -1;
      });
      this.store.dispatch(new SetCurrentFilmsList(rFilms));
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
    this.cinemaTitle = CONSTS.CINEMA_NAME;
    this.minValue = CONSTS.MIN_TIME;
    this.maxValue = CONSTS.MAX_TIME;
    this.isSortDown = null;

    if (genre.toLowerCase() === "Все жанры".toLowerCase()) {
      this.genreTitle = CONSTS.GENRE_NAME;
      this.store.dispatch(new SetCurrentFilmsList(this.allFilms));
    } else {
      this.genreTitle = genre;
      const films = this.allFilms.filter( film => {
        return film.genres.find( filmGenre => {
          return filmGenre.toLowerCase() === genre.toLowerCase();
        });
      });
      this.store.dispatch(new SetCurrentFilmsList(films));
    }
    this.isGenreDropdown = false;
    this.dateValue = this.today;
  }
  // поиск фильма по названию
  searchFilm(event: Event): void {
    this.dateValue = this.today;
    this.genreTitle = CONSTS.GENRE_NAME;
    this.minValue = CONSTS.MIN_TIME;
    this.maxValue = CONSTS.MAX_TIME;
    this.cinemaTitle = CONSTS.CINEMA_NAME;
    const neededFilm: string = (<HTMLInputElement>event.target).value;

    const filmByName = this.allFilms.filter( film => film.name.toLowerCase().includes(neededFilm.toLowerCase()));
    if (!neededFilm.trim()) {
      this.store.dispatch(new SetCurrentFilmsList(this.allFilms));
    } else {
      this.store.dispatch(new SetCurrentFilmsList(filmByName));
    }
  }

  // вывести список фильмов из кинотеатра с названием name
  showFilmsByCinemaName(name: string): void {
    // this.showAllFilms();
    this.genreTitle = CONSTS.GENRE_NAME;
    this.minValue = CONSTS.MIN_TIME;
    this.maxValue = CONSTS.MAX_TIME;
    this.dateValue = this.today;
    let theaterName = "";
    let films: Film[] = [];

    this.subscriptions$.add(this.filmsState$.subscribe( state => {
      const theater = state.cinemas.find( cinema => {
        return cinema.name.toLowerCase() === name.toLowerCase();
      });
      films = JSON.parse(JSON.stringify(theater.films));
      theaterName = theater.name;
      this.isCinemaDropdown = false;
    }));
    this.store.dispatch(new SetCurrentFilmsList(films));
    this.cinemaTitle = theaterName;
  }

  // вывести список фильмов, которые идут в заданном диаппазоне времени
  showFilmsByTime(): void {
    this.isSortDown = null;
    this.genreTitle = CONSTS.GENRE_NAME;
    this.cinemaTitle = CONSTS.CINEMA_NAME;
    this.dateValue = this.today;
    this.store.dispatch(new GetFilmByTimeInterval());
  }

  selectFilmsByDate(inputValue: string): void {
    this.cinemaTitle = CONSTS.CINEMA_NAME;
    this.genreTitle = CONSTS.GENRE_NAME;
    this.minValue = CONSTS.MIN_TIME;
    this.maxValue = CONSTS.MAX_TIME;
    this.isCinemaDropdown = false;
    this.isGenreDropdown = false;
    this.dateValue = inputValue;

    const inputDateTime = new Date(inputValue).getTime();
    const nowDate = this.formatDate(new Date());
    if (!inputValue || inputValue === nowDate) {
      this.store.dispatch(new SetCurrentFilmsList(this.allFilms));
      return;
    }
    this.store.dispatch(new GetScreeningPeriodList(inputDateTime));

  }
  // вывести список фильмов по дате
  showFilmsByDate(event: Event): void {
    const inputValue = (<HTMLInputElement>event.target).value;
    this.selectFilmsByDate(inputValue);
  }

  showAllFilms(): void {
    this.store.dispatch(new SetCurrentFilmsList(this.allFilms));
    this.cinemaTitle = CONSTS.CINEMA_NAME;
    this.genreTitle = CONSTS.GENRE_NAME;
    this.isCinemaDropdown = false;
    this.isGenreDropdown = false;
    this.dateValue = this.today;
  }

  ngOnDestroy(): void {
    if (this.subscriptions$) {
      this.subscriptions$.unsubscribe();
      this.subscriptions$ = null;
    }
  }

  setMinValue(event: number): void {
    this.store.dispatch(new SetMinValueTime(event));
  }
  setMaxValue(event: number): void {
    this.store.dispatch(new SetMaxValueTime(event));
  }
}
