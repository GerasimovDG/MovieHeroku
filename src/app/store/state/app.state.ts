import { IBookingState, initialBookingState } from "./booking.state";
import { IFilmsState, initialFilmsState } from "./films.state";
import { initialUserState, IUserState } from "./user.state";

export interface IAppState {
  user: IUserState;
  films: IFilmsState;
  booking: IBookingState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  films: initialFilmsState,
  booking: initialBookingState,
};

export function getInitialState(): IAppState {
 return initialAppState;
}
