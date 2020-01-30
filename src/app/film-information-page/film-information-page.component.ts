import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { BookingInfo, Film, FilmSessionTime } from "../shared/interfaces";
import { DataHandlerService } from "../shared/services/data-handler.service";

@Component({
  selector: "app-film-information-page",
  templateUrl: "./film-information-page.component.html",
  styleUrls: ["./film-information-page.component.less"]
})



export class FilmInformationPageComponent implements OnInit {

  /** @internal */
  public film: Film;
  /** @internal */
  public cinemaList: string[] = [];
  private filmSessions: FilmSessionTime[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataHandler: DataHandlerService,
              ) {
  }

  ngOnInit(): void {
    const filmID = this.route.snapshot.params.id;

    this.dataHandler.getFilmByID(filmID).pipe(
      take(1))
      .subscribe( film => {
        this.film = film;
        this.filmSessions = this.dataHandler.getFilmSessions(this.film.name);
        this.filmSessions.forEach( session => {
          this.cinemaList = [...new Set([...this.cinemaList, session.cinema])];
        });

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
}
