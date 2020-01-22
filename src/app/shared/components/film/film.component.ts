import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Film } from "../../interfaces";

@Component({
  selector: "app-film",
  templateUrl: "./film.component.html",
  styleUrls: ["./film.component.less"]
})
export class FilmComponent implements OnInit {

  @Input() film: Film;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openFilmPage(): void {
    this.router.navigate(["film-information", this.film.id]);
  }
}
