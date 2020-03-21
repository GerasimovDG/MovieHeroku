import { FILMS_ACTIONS, FilmsActions } from "../actions/films.actions";
import { IFilmsState, initialFilmsState } from "../state/films.state";

export const filmsReducers = (
  state = initialFilmsState,
  action: FilmsActions,
): IFilmsState => {
  switch (action.type) {
    case FILMS_ACTIONS.GET_CINEMA_LIST:
      return {
        ...state,
        loading: true,
      };
    case FILMS_ACTIONS.GET_CINEMA_LIST_SUCCESS:
      return {
        ...state,
        cinemas: action.payload,
        loading: false,
      };
    case FILMS_ACTIONS.GET_FILMS_LIST:
      return {
        ...state,
        loading: true,
      };
    case FILMS_ACTIONS.GET_FILMS_LIST_SUCCESS:
      return {
        ...state,
        films: action.payload,
        loading: false,
      };
    case FILMS_ACTIONS.SET_CURRENT_FILMS_LIST:
      return {
        ...state,
        currentFilms: action.payload,
      };
    case FILMS_ACTIONS.SET_MIN_VALUE:
      return {
        ...state,
        minValue: action.payload,
      };
    case FILMS_ACTIONS.SET_MAX_VALUE:
      return {
        ...state,
        maxValue: action.payload,
      };
    case FILMS_ACTIONS.SET_CINEMA_LIST:
      return {
        ...state,
        cinemaList: [...new Set([...state.cinemaList, action.payload])],
      };
    case FILMS_ACTIONS.CLEAR_CINEMA_LIST:
      return {
        ...state,
        cinemaList: [],
      };
    case FILMS_ACTIONS.SET_SELECTED_FILM:
      return {
        ...state,
        selectedFilm: action.payload,
      };
    case FILMS_ACTIONS.GET_FILM_SESSIONS_LIST_SUCCESS:
      return {
        ...state,
        filmSessions: action.payload,
      };
    case FILMS_ACTIONS.MERGE_GENRES_LIST:
      return {
        ...state,
        // слияние жанров без повторений в один список.
        genres: [ ...new Set([...state.genres, ...action.payload])]
      };
    case FILMS_ACTIONS.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
