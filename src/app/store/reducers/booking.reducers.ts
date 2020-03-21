import { BOOKING_ACTIONS, BookingActions } from "../actions/booking.action";
import { IBookingState, initialBookingState } from "../state/booking.state";

export const bookingReducers = (
  state = initialBookingState,
  action: BookingActions,
): IBookingState => {
  switch (action.type) {
    case BOOKING_ACTIONS.SET_BOOKING_INFO:
      return {
        ...state,
        bookingInfo: action.payload,
      };
    case BOOKING_ACTIONS.SET_SELECTED_PLACES_SUCCESS:
      return {
        ...state,
        setPlacesFlag: action.payload,
      };
    case BOOKING_ACTIONS.TOGGLE_TICKET_OPEN:
      return {
        ...state,
        ticketOpen: action.payload,
        ticketNumber: Math.floor(Math.random() * 4000000) + 1000000,
      };
    case BOOKING_ACTIONS.TOGGLE_ERROR_OPEN:
      return {
        ...state,
        errorOpen: action.payload,
      };
    default:
      return state;
  }
};
