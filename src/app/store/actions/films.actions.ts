import { Action } from "@ngrx/store";
import { Film, Theater } from "../../shared/interfaces";

export enum FILMS_ACTIONS {
  GET_CINEMA_LIST = "[FIlms] Get cinemas list",
  GET_CINEMA_LIST_SUCCESS = "[FIlms] Get cinemas list success",

  GET_FILMS_LIST = "[Films] Get films list",
  GET_FILMS_LIST_SUCCESS = "[Films] Get films list success",
  SET_CURRENT_FILMS_LIST = "[Films] Set current films list",
  GET_FILMS_BY_TIME_INTERVAL = "[Films] Get films by time interval",
  GET_FILMS_BY_TIME_INTERVAL_SUCCESS = "[Films] Get films by time interval - success",

  GET_SCREENING_PERIOD_LIST = "[Films] Get screening period list",
  GET_SCREENING_PERIOD_LIST_SUCCESS = "[Films] Get screening period list - success",

  SET_MIN_VALUE = "[Films] Set time min value",
  SET_MAX_VALUE = "[Films] Set time max value",

  MERGE_GENRES_LIST = "[Films] Construct genres list",

  TOGGLE_LOADING = "[Films] Toggle loading flag",
}

export class GetCinemaList implements Action {
  public readonly type = FILMS_ACTIONS.GET_CINEMA_LIST;
  constructor(public payload?: Theater[]) {
  }
}
export class GetCinemaListSuccess implements Action {
  public readonly type = FILMS_ACTIONS.GET_CINEMA_LIST_SUCCESS;
  constructor(public payload: Theater[]) {
  }
}

export class GetFilmsList implements  Action {
  public readonly type = FILMS_ACTIONS.GET_FILMS_LIST;
}
export class GetFilmsListSuccess implements Action {
  public readonly type = FILMS_ACTIONS.GET_FILMS_LIST_SUCCESS;
  constructor(public payload: Film[]) {
  }
}
export class SetCurrentFilmsList implements  Action {
  public readonly type = FILMS_ACTIONS.SET_CURRENT_FILMS_LIST;
  constructor(public payload: Film[]) {
  }
}
export class GetFilmByTimeInterval implements Action {
  public readonly type = FILMS_ACTIONS.GET_FILMS_BY_TIME_INTERVAL;
}
export class GetFilmByTimeIntervalSuccess implements Action {
  public readonly type = FILMS_ACTIONS.GET_FILMS_BY_TIME_INTERVAL_SUCCESS;
}

export class MergeGenresList implements Action {
  public readonly type = FILMS_ACTIONS.MERGE_GENRES_LIST;
  constructor(public payload: string[]) {
  }
}

export class ToggleLoadingOn implements  Action {
  public readonly type = FILMS_ACTIONS.TOGGLE_LOADING;
  constructor(public payload: boolean) {
  }
}

export class GetScreeningPeriodList implements Action {
  public readonly  type = FILMS_ACTIONS.GET_SCREENING_PERIOD_LIST;
  constructor(public payload: number) {
  }
}
export class GetScreeningPeriodListSuccess implements Action {
  public readonly  type = FILMS_ACTIONS.GET_SCREENING_PERIOD_LIST_SUCCESS;
}

export class SetMinValueTime implements Action {
  public readonly type = FILMS_ACTIONS.SET_MIN_VALUE;
  constructor(public payload: number) {
  }
}
export class SetMaxValueTime implements Action {
  public readonly type = FILMS_ACTIONS.SET_MAX_VALUE;
  constructor(public payload: number) {
  }
}


export type FilmsActions = GetCinemaList | GetCinemaListSuccess
  | GetFilmsList            | GetFilmsListSuccess
  | SetCurrentFilmsList
  | GetFilmByTimeInterval   | GetFilmByTimeIntervalSuccess
  | GetScreeningPeriodList  | GetScreeningPeriodListSuccess
  | SetMinValueTime         | SetMaxValueTime
  | MergeGenresList
  | ToggleLoadingOn;
