import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IBookingState } from "../state/booking.state";

const selectBooking = (state: IAppState) => state.booking;

export const selectBookingState = createSelector(
  selectBooking,
  (state: IBookingState) => state,
);
