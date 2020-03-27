import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { DataService } from "../../shared/services/data.service";
import { BOOKING_ACTIONS, SetBookingInfo, SetSelectedPlaces, ToggleErrorOpenFlag, ToggleTicketOpenFlag } from "../actions/booking.action";
import { selectBookingState } from "../selectors/booking.selector";
import { IAppState } from "../state/app.state";

@Injectable()
export class BookingEffects {
  @Effect() setSelectedPlaces = this._actions$.pipe(
    ofType<SetSelectedPlaces>(BOOKING_ACTIONS.SET_SELECTED_PLACES),
    withLatestFrom(this._store.pipe(select(selectBookingState))),
    switchMap( ([, state]) => {
      return this.data.setSelectedPlaces(JSON.parse(JSON.stringify(state.bookingInfo)));
    }),
    withLatestFrom(this._store.pipe(select("booking"))),
    map( ([flag, state])  => {
      const tmpBookingInfo = JSON.parse(JSON.stringify(state.bookingInfo));
      if (flag) {
        tmpBookingInfo.session.hall.places = tmpBookingInfo.session.hall.places.map(row => {
          return row.map(seat => seat === 1 ? 2 : seat);
        });
        this._store.dispatch(new ToggleTicketOpenFlag(true));
        this._store.dispatch(new SetBookingInfo(tmpBookingInfo));
      } else {
        tmpBookingInfo.session.hall.places = tmpBookingInfo.session.hall.places.map(row => {
          return row.map(seat => seat === 1 ? 0 : seat);
        });
        this._store.dispatch(new ToggleErrorOpenFlag(true));
      }
      return new SetBookingInfo(tmpBookingInfo);
    }),
  );

  constructor(private _actions$: Actions,
              private _store: Store<IAppState>,
              private data: DataService,
  ) {
  }
}
