import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { bookingReducers } from "./booking.reducers";
import { filmsReducers } from "./films.reducers";
import { userReducers } from "./user.reducers";

// tslint:disable-next-line:no-any
export const appReducers: ActionReducerMap<IAppState, any> = {
  user: userReducers,
  films: filmsReducers,
  booking: bookingReducers,
};
