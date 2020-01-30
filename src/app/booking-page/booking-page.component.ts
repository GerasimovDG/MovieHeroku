import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookingInfo } from "../shared/interfaces";
import { DataHandlerService } from "../shared/services/data-handler.service";

@Component({
  selector: "app-booking-page",
  templateUrl: "./booking-page.component.html",
  styleUrls: ["./booking-page.component.less"]
})
export class BookingPageComponent implements OnInit, OnDestroy {

  @ViewChild("platform", {static: false}) pRef: ElementRef;

  /** @internal */
  public bookingInfo: BookingInfo;
  /** @internal */
  public dateNow: Date = new Date();
  /** @internal */
  public price = 0;
  row: number = null;
  place: number = null;
  places = new Map();
  /** @internal */
  public placesEntries = [];

  constructor(private dataHandler: DataHandlerService,
              private route: ActivatedRoute,
              private router: Router) {
    this.bookingInfo = this.dataHandler.bookingInfo;
    if (!this.bookingInfo) {
      const filmID = this.route.snapshot.params.id;
      this.router.navigate(["film-information", filmID]);
    }
  }

  ngOnInit(): void {
  }


  getEventTargetValue(event: Event): number {
    return +(<HTMLInputElement>event.target).value;
  }

  choosePlace(): void {
    // проверка на выход за количество рядов и сидений
    if (!this.row || !this.place) { return; }
    if (this.row > this.bookingInfo.session.hall.places.length  || this.place > this.bookingInfo.session.hall.places[this.row - 1].length) {
      return;
    }
    // если место уже выбрано или куплено
    if ( this.bookingInfo.session.hall.places[this.row - 1][this.place - 1] === 1 ||  this.bookingInfo.session.hall.places[this.row - 1][this.place - 1] === 2) {
      return;
    }

    this.bookingInfo.session.hall.places[this.row - 1][this.place - 1] = 1;
    const key = this.row;
    const newValue = this.place;

    const value = this.places.has(key) ? this.places.get(key) : [];
    this.places.set(key, value.concat([newValue]).sort());
    this.placesEntries = Array.from(this.places.entries());
    this.row = null;
    this.place = null;
    this.price += this.bookingInfo.session.hall.price;
  }

  ngOnDestroy(): void {
    // убираем выбранные места
    if (this.bookingInfo) {
      this.bookingInfo.session.hall.places = this.bookingInfo.session.hall.places.map( row => {
        return row.map( place => place === 1 ? 0 : place);
      });
    }
  }

  removeChoicePlace(row: number, place: number): void {
    this.bookingInfo.session.hall.places[row - 1][place - 1] = 0;
    const newPlaces = Array.from(this.places.get(row)).filter( seat => {
      return seat !== place;
    });
    if (newPlaces.length === 0) {
      this.places.delete(row);
    } else {
      this.places.set(row, newPlaces);
    }
    this.placesEntries = Array.from(this.places.entries());
    this.price -= this.bookingInfo.session.hall.price;
  }

  choosePlaceOnClick(row: number, place: number): void {
    if (this.bookingInfo.session.hall.places[row - 1][place - 1] === 2) {
      return;
    }
    if ( this.bookingInfo.session.hall.places[row - 1][place - 1] === 1) {
      this.removeChoicePlace(row, place);
      return;
    }
    this.row = row;
    this.place = place;

    this.choosePlace();
  }

  buyTickets(): void {
    this.bookingInfo.session.hall.places = this.bookingInfo.session.hall.places.map( row => {
      return row.map( seat => seat === 1 ? 2 : seat);
    });
    this.placesEntries = [];
    this.places.clear();
    this.price = 0;
  }
}
