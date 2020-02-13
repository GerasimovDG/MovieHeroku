import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { take } from "rxjs/operators";
import { User } from "../shared/interfaces";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-main-layout",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.less"]
})
export class MainLayoutComponent implements OnInit {

  isOpenDropdown: boolean = false;
  currentUser: User = this.data.currentUser;

  constructor(private cdr: ChangeDetectorRef,
              private cookieService: CookieService,
              private router: Router,
              private data: DataService,
  ) {
  }

  ngOnInit(): void {
    this.data.getCurrentUser(this.data.currentUser.login).pipe(take(1)).subscribe( user => {
      this.currentUser = user;
      this.cdr.detectChanges();
    });
  }

  logout(): void {
    this.cookieService.delete("login", "/");
    this.router.navigate(["signin"]);
  }
}
