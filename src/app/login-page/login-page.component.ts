import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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

  form: FormGroup;

  login$: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
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
