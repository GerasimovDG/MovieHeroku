import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
import { Film } from "../shared/interfaces";
import { DataHandlerService } from "../shared/services/data-handler.service";

@Component({
  selector: "app-film-information-page",
  templateUrl: "./film-information-page.component.html",
  styleUrls: ["./film-information-page.component.less"]
})



export class FilmInformationPageComponent implements OnInit {

  public film: Film;

  constructor(private route: ActivatedRoute,
              private dataHandler: DataHandlerService,
              ) {
  }

  ngOnInit(): void {
    const filmID = this.route.snapshot.params.id;

    this.dataHandler.getFilmByID(filmID).pipe(
      take(1))
      .subscribe( film => this.film = film);
  }


}
