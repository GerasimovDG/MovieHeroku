import { Film, ScreeningPeriod, Theater } from "../../shared/interfaces";

export interface IFilmsState {
  cinemas: Theater[];
  films: Film[];
  currentFilms: Film[];
  genres: string[];
  screeningPeriods: ScreeningPeriod[];
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
  loading: false,
  minValue: 0,
  maxValue: 86399,
};
