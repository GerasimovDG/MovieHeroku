import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { ChoicePlaceValidator } from "../shared/validators/choice-place.validator";
import { SetBookingInfo, SetSelectedPlaces, ToggleErrorOpenFlag, ToggleTicketOpenFlag } from "../store/actions/booking.action";
import { IAppState } from "../store/state/app.state";
import { IBookingState } from "../store/state/booking.state";

@Component({
  selector: "app-booking-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./booking-page.component.html",
  styleUrls: ["./booking-page.component.less"]
})
export class BookingPageComponent implements OnInit, OnDestroy {

  /** @internal */
  public dateNow: Date = new Date();
  /** @internal */
  public price = 0;

  places = new Map();
  /** @internal */
  public placesEntries = [];
  /** @internal */
  public countPlacesInRow: number[] = [];
  form: FormGroup;
  /** @internal */
  public rowIdx = 0;
  /** @internal */
  public buyBtn_disabled = false;

  subscriptions$: Subscription = new Subscription();

  /** @internal */
  bookingState$: Observable<IBookingState>;
  private placesLength;

  constructor(private store: Store<IAppState>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.bookingState$ = this.store.select("booking");
    this.subscriptions$.add(this.bookingState$.subscribe( state => {
      if (!state.bookingInfo) {
        const filmID = this.route.snapshot.params.id;
        this.router.navigate(["film-information", filmID]);
      } else {
        state.bookingInfo.session.hall.places.forEach( (row, idx) => {
          this.countPlacesInRow[idx] = row.length;
        });
        this.placesLength = state.bookingInfo.session.hall.places.length;
      }
    }));

    this.form = new FormGroup({
      row: new FormControl( null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max( this.placesLength ),
        ]),
      place: new FormControl(null,
        [
          Validators.required,
          Validators.min(1),
        ])
    }, [ChoicePlaceValidator.restrictedPlace(this.countPlacesInRow)]);
  }


  getEventTargetValue(event: Event): number {
    return +(<HTMLInputElement>event.target).value;
  }

  choosePlace(): void {
    // проверка на выход за количество рядов и сидений
    const row: number = +this.form.value.row;
    const place: number = +this.form.value.place;

    if (this.form.valid) {
      // если место уже выбрано или куплено
      this.bookingState$.pipe(take(1)).subscribe( state => {
        if (state.bookingInfo.session.hall.places[row - 1][place - 1] === 1 || state.bookingInfo.session.hall.places[row - 1][place - 1] === 2) {
          return;
        }
        if (row > this.countPlacesInRow.length || place > this.countPlacesInRow[row - 1]) {
          return;
        }
        const tmpBookingInfo = JSON.parse(JSON.stringify(state.bookingInfo));
        tmpBookingInfo.session.hall.places[row - 1][place - 1] = 1;
        this.store.dispatch(new SetBookingInfo(tmpBookingInfo));

        const value = this.places.has(row) ? this.places.get(row) : [];
        this.places.set(row, value.concat([place]).sort());
        this.placesEntries = Array.from(this.places.entries());

        this.form.reset();
        this.price += tmpBookingInfo.session.hall.price;
      });
    }
  }

  removeChoicePlace(row: number, place: number): void {
    this.bookingState$.pipe(take(1)).subscribe( state => {
      const tmpBookingInfo = JSON.parse(JSON.stringify(state.bookingInfo));
      tmpBookingInfo.session.hall.places[row - 1][place - 1] = 0;

      const newPlaces = Array.from(this.places.get(row)).filter( seat => {
        return seat !== place;
      });
      if (newPlaces.length === 0) {
        this.places.delete(row);
      } else {
        this.places.set(row, newPlaces);
      }
      this.placesEntries = Array.from(this.places.entries());
      this.price -= tmpBookingInfo.session.hall.price;
      this.store.dispatch(new SetBookingInfo(tmpBookingInfo));
    });
  }

  choosePlaceOnClick(row: number, place: number): void {
    this.bookingState$.pipe(take(1)).subscribe( state => {
      if (state.bookingInfo.session.hall.places[row - 1][place - 1] === 2) {
        return;
      }
      if ( state.bookingInfo.session.hall.places[row - 1][place - 1] === 1) {
        this.removeChoicePlace(+row, +place);
        return;
      }
      this.form.patchValue({row: +row});
      this.form.patchValue({place: +place});

      this.choosePlace();
    });
  }

  buyTickets(): void {
    if (this.buyBtn_disabled || !this.placesEntries.length) {
      return;
    }
    this.buyBtn_disabled = true;
    this.store.dispatch(new SetSelectedPlaces());
  }

  getPlaceSize(i: number[]): number {
    return ((100 / i.length) - 1);
  }

  closeTicket(): void {
    this.placesEntries = [];
    this.places.clear();
    this.price = 0;
    this.buyBtn_disabled = false;

    this.store.dispatch(new ToggleTicketOpenFlag(false));
    this.store.dispatch(new ToggleErrorOpenFlag(false));
  }

  ngOnDestroy(): void {
    // убираем выбранные места
    this.bookingState$.pipe(take(1)).subscribe(state => {
      if (state.bookingInfo) {
        const tmpBookingInfo = JSON.parse(JSON.stringify(state.bookingInfo));
        tmpBookingInfo.session.hall.places = tmpBookingInfo.session.hall.places.map( row => {
          return row.map( place => place === 1 ? 0 : place);
        });
        this.store.dispatch(new SetBookingInfo(tmpBookingInfo));
      }
    });
    if (this.subscriptions$) {
      this.subscriptions$.unsubscribe();
      this.subscriptions$ = null;
    }
  }
}
