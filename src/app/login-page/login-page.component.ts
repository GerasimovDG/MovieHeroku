import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subscription } from "rxjs";
import { User } from "../shared/interfaces";
import { AuthDataService, DataService } from "../shared/services/data.service";
import { LoginValidator } from "../shared/validators/login.validator";

@Component({
  selector: "app-login-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.less"]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  disableBtn: boolean = false;
  isShowPassword: boolean = false;
  isErrorLogin: boolean = false;
  isOpenRegisterForm = false;

  message: string;

  form: FormGroup;
  formReg: FormGroup;

  login$: Subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef,
              private auth: AuthDataService,
              private data: DataService,
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
          LoginValidator.restrictedPassword,
          Validators.minLength(6),
        ])
    });
    this.formReg = new FormGroup({
      name: new FormControl( null,
        Validators.required,
      ),
      login: new FormControl( null,
        [
          Validators.required,
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          LoginValidator.restrictedPassword,
          Validators.minLength(6),
        ]),
      password2: new FormControl(null,
        [
          Validators.required,
          LoginValidator.restrictedPassword,
          Validators.minLength(6),
        ]),
    }, [LoginValidator.passwordMatch]);
  }

  loginUser(user: User): Subscription {
    return this.auth.login(user).subscribe( (loginUser) => {
      if (!!loginUser) {
        // 0.000231481 - 20 секунд в днях, 0,00694444 - 10 минут 0.0208333 - 30 минут
        this.cookieService.set("login", loginUser.login, 0.0208333, "/", null, null, "Strict");

        this.data.currentUser = loginUser;
        this.isErrorLogin = false;
        this.router.navigate(["dashboard"]);
      } else {
        this.isErrorLogin = true;
      }
      this.disableBtn = false;
      this.cdr.detectChanges();
    });
  }
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.disableBtn = true;

    const user: User = {
      login: this.form.value.login,
      password: this.form.value.password,
    };

    this.login$.add(this.loginUser(user));
  }

  ngOnDestroy(): void {
    if (this.login$) {
      this.login$.unsubscribe();
      this.login$ = null;
    }
  }

  submitReg(): void {
    if (this.formReg.invalid) {
      return;
    }
    this.disableBtn = true;

    const user: User = {
      name: this.formReg.value.name,
      login: this.formReg.value.login,
      password: this.formReg.value.password,
    };

    this.login$.add(this.auth.register(user).subscribe( (isRegister) => {
      if (!isRegister) {
        this.isErrorLogin = true;
      } else {
        this.login$.add(this.loginUser(user));
      }
      this.cdr.detectChanges();
    }));
  }

  openRegisterForm(): void {
    this.isOpenRegisterForm = true;
    this.isErrorLogin = false;
  }

  openLoginForm(): void {
    this.isOpenRegisterForm = false;
    this.isErrorLogin = false;
  }
}
