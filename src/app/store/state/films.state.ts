import { Film, FilmSessionTime, ScreeningPeriod, Theater } from "../../shared/interfaces";

export interface IFilmsState {
  cinemas: Theater[];
  films: Film[];
  currentFilms: Film[];
  genres: string[];
  screeningPeriods: ScreeningPeriod[];
  filmSessions: FilmSessionTime[];
  cinemaList: string[];
  selectedFilm: Film;
  loading: boolean;
  minValue: number;
  maxValue: number;
}

export const initialFilmsState: IFilmsState = {
  cinemas: [],
  films: [],
  currentFilms: [],
  genres: [],
  screeningPeriods: [],
  filmSessions: [],
  cinemaList: [],
  selectedFilm: null,
  loading: false,
  minValue: 0,
  maxValue: 86399,
};
