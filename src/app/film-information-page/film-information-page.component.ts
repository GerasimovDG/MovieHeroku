import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { BookingInfo, Film, FilmSessionTime } from "../shared/interfaces";
import { DataService } from "../shared/services/data.service";

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

  subscriptions$: Subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private dataHandler: DataService,
              ) {
  }

  ngOnInit(): void {
    this.loading = true;
    const filmID = this.route.snapshot.params.id;

    this.dataHandler.getFilmByID(filmID).pipe(
      take(1))
      .subscribe( film => {
        if (!film) { this.router.navigate(["**"]); return; }
        this.film = film;
        this.subscriptions$.add(this.dataHandler.getFilmSessions(this.film.name).subscribe( sessions => {
          this.filmSessions = sessions;
          this.filmSessions.forEach( session => {
            this.cinemaList = [...new Set([...this.cinemaList, session.cinema])];
          });
          this.loading = false;
          this.cdr.detectChanges();
        }));

      });
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
