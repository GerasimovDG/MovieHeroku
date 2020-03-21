import { Action } from "@ngrx/store";
import { BookingInfo } from "../../shared/interfaces";

export enum BOOKING_ACTIONS {
  SET_BOOKING_INFO = "[Booking page] Set booking info",

  SET_SELECTED_PLACES = "[Booking page] Set selected places",
  SET_SELECTED_PLACES_SUCCESS = "[Booking page] Set selected places - success",

  TOGGLE_TICKET_OPEN = "[Booking page] Toggle ticket open flag",
  TOGGLE_ERROR_OPEN = "[Booking page] Toggle error open flag",
}

export class SetBookingInfo implements Action {
  public readonly type = BOOKING_ACTIONS.SET_BOOKING_INFO;
  constructor(public payload: BookingInfo) {
  }
}

export class SetSelectedPlaces implements Action {
  public readonly type = BOOKING_ACTIONS.SET_SELECTED_PLACES;
  // constructor(public payload: BookingInfo) {
  // }
}

export class SetSelectedPlacesSuccess implements Action {
  public readonly type = BOOKING_ACTIONS.SET_SELECTED_PLACES_SUCCESS;
  constructor(public payload: boolean) {
  }
}

export class ToggleTicketOpenFlag implements Action {
  public readonly type = BOOKING_ACTIONS.TOGGLE_TICKET_OPEN;
  constructor(public payload: boolean) {
  }
}
export class ToggleErrorOpenFlag implements Action {
  public readonly type = BOOKING_ACTIONS.TOGGLE_ERROR_OPEN;
  constructor(public payload: boolean) {
  }
}

export type BookingActions = SetBookingInfo
  | SetSelectedPlaces
  | SetSelectedPlacesSuccess
  | ToggleTicketOpenFlag
  | ToggleErrorOpenFlag;
