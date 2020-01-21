import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subscription } from "rxjs";
import { AuthService } from "../shared/auth.service";
import { User } from "../shared/interfaces";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.less"]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  disableBtn: boolean = false;
  isShowPassword: boolean = false;
  isErrorLogin: boolean = false;

  message: string;

  form: FormGroup;

  login$: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private cookieService: CookieService,
  ) {
  }

  ngOnInit(): void {
    if (this.cookieService.check("login")) {
      this.router.navigate(["dashboard"]);
    }

    if (this.route.snapshot.queryParams["needLogin"]) {
      this.message = "Необходимо авторизоваться";
    }

    this.form = new FormGroup({
      login: new FormControl( null,
        [
          Validators.required,
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6),
        ])
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.disableBtn = !this.disableBtn;

    const user: User = {
      login: this.form.value.login,
      password: this.form.value.password,
    };

    this.login$ = this.auth.login(user).subscribe( (isLogin) => {
      if (isLogin) {
        // 0.000231481 - 20 секунд в днях
        this.cookieService.set("login", "true", 0.00694444, "/", null, null, "Strict");

        this.isErrorLogin = false;
        this.router.navigate(["dashboard"]);
      } else {
        this.isErrorLogin = true;
      }
      this.disableBtn = !this.disableBtn;
    });

  }

  ngOnDestroy(): void {
    if (this.login$) {
      this.login$.unsubscribe();
      this.login$ = null;
    }
  }
}
