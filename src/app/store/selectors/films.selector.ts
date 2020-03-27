import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IFilmsState } from "../state/films.state";

const selectFilms = (state: IAppState) => state.films;

export const selectFilmsState = createSelector(
  selectFilms,
  (state: IFilmsState) => state,
);
