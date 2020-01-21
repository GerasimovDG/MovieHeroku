import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.less"]
})
export class MainLayoutComponent implements OnInit {

  isOpenDropdown: boolean = false;

  constructor(private cookieService: CookieService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.cookieService.delete("login");
    this.router.navigate(["signin"]);
  }
}
