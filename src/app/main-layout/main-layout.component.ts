import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { User } from "../shared/interfaces";
import { GetCurrentUserInfo } from "../store/actions/user.actions";
import { selectSelectedUser } from "../store/selectors/user.selector";
import { IAppState } from "../store/state/app.state";

@Component({
  selector: "app-main-layout",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.less"]
})
export class MainLayoutComponent implements OnInit {

  isOpenDropdown: boolean = false;
  user$: Observable<User>;
  usersLogin: string;

  constructor(private store: Store<IAppState>,
              private cookieService: CookieService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectSelectedUser));

    this.usersLogin = this.cookieService.get("login");
    this.store.dispatch(new GetCurrentUserInfo(this.usersLogin));
  }

  logout(): void {
    this.cookieService.delete("login", "/");
    this.router.navigate(["signin"]);
  }
}
