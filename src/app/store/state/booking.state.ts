import { BookingInfo } from "../../shared/interfaces";

export interface IBookingState {
  bookingInfo: BookingInfo;
  setPlacesFlag: boolean;
  ticketOpen: boolean;
  errorOpen: boolean;
  ticketNumber: number;
}

export const initialBookingState: IBookingState = {
  bookingInfo: null,
  setPlacesFlag: null,
  ticketOpen: false,
  errorOpen: false,
  ticketNumber: null,
};
