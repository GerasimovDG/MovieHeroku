import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { BookingInfo, Film, FilmSessionTime } from "../shared/interfaces";
import { DataService } from "../shared/services/data.service";
import { SetBookingInfo } from "../store/actions/booking.action";
import { ClearCinemaList, GetFilmSessionsList } from "../store/actions/films.actions";
import { IAppState } from "../store/state/app.state";
import { IFilmsState } from "../store/state/films.state";

@Component({
  selector: "app-film-information-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./film-information-page.component.html",
  styleUrls: ["./film-information-page.component.less"]
})



export class FilmInformationPageComponent implements OnInit, OnDestroy {

  /** @internal */
  public film: Film;
  /** @internal */
  public cinemaList: string[] = [];
  private filmSessions: FilmSessionTime[];

  /** @internal */
  public loading = false;

  public filmsState$: Observable<IFilmsState>;
  subscriptions$: Subscription = new Subscription();

  constructor(private store: Store<IAppState>,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private dataHandler: DataService,
              ) {
  }

  ngOnInit(): void {
    this.filmsState$ = this.store.select("films");
    const filmID = this.route.snapshot.params.id;
    this.store.dispatch(new ClearCinemaList());
    this.store.dispatch(new GetFilmSessionsList(filmID));

    this.subscriptions$.add(this.filmsState$.subscribe( state => {
      this.filmSessions = JSON.parse(JSON.stringify(state.filmSessions));
      this.film = JSON.parse(JSON.stringify(state.selectedFilm));
    }));
  }

  getSessionList(cinema: string): FilmSessionTime[] {
    return this.filmSessions.filter( session => session.cinema === cinema);
  }

  // проверка сеанс уже прошел или нет
  disableBtnByTime(time: number): boolean {
    const timeDate: Date = new Date(time * 1000);
    const now: Date = new Date();

    if (timeDate.getUTCHours() > now.getHours()) {
      return false;
    }
    if (timeDate.getUTCHours() === now.getHours()) {
      if (timeDate.getUTCMinutes() > now.getUTCMinutes()) {
        return false;
      }
    }
    return true;
  }

  openTicketBuyPage(session: FilmSessionTime): void {
    const bookingInfo: BookingInfo = {
      film: this.film,
      session: session,
    };
    if (!this.disableBtnByTime(session.time)) {
      this.dataHandler.bookingInfo = bookingInfo;
      this.store.dispatch(new SetBookingInfo(JSON.parse(JSON.stringify(bookingInfo))));
      this.router.navigate(["/booking", this.film.id]);
    }

  }

  ngOnDestroy(): void {
    if (this.subscriptions$) {
      this.subscriptions$.unsubscribe();
      this.subscriptions$ = null;
    }
  }
}
