import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { Observable, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { User } from "../shared/interfaces";
import { AuthDataService, DataService } from "../shared/services/data.service";
import { LoginValidator } from "../shared/validators/login.validator";
import { DisableBtnActivated, DisableBtnDeactivated, IsErrorLoginFalse, IsErrorLoginTrue, LoginUser, RegistrationUser } from "../store/actions/user.actions";
import { IAppState } from "../store/state/app.state";
import { IUserState } from "../store/state/user.state";

@Component({
  selector: "app-login-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.less"]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  isShowPassword: boolean = false;
  isOpenRegisterForm = false;
  message: string;

  form: FormGroup;
  formReg: FormGroup;

  login$: Subscription = new Subscription();
  userState$: Observable<IUserState>;

  constructor(private store: Store<IAppState>,
              private cdr: ChangeDetectorRef,
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

    if (this.route.snapshot.queryParamMap.get("needLogin")) {
      this.message = "Необходимо авторизоваться";
    }

    this.userState$ = this.store.select("user");

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
  loginUser(user: User): void {
    this.store.dispatch(new LoginUser(user));
}

  checkFormValidation(form: FormGroup): boolean {
    let flag: boolean = true;
    if (form.invalid) {
      return false;
    }
    let disable: boolean;
    this.login$.add(this.userState$.pipe(take(1)).subscribe( userState => {
      disable = userState.disableBtn;
      if (disable) {
        flag = false;
      }
    }));
    return flag;
  }

  submit(): void {
    if (!this.checkFormValidation(this.form)) {
      return;
    }
    this.store.dispatch(new DisableBtnActivated());

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
    if (!this.checkFormValidation(this.formReg)) {
      return;
    }

    this.store.dispatch(new DisableBtnActivated());

    const user: User = {
      name: this.formReg.value.name,
      login: this.formReg.value.login,
      password: this.formReg.value.password,
    };

    this.store.dispatch(new RegistrationUser(user));
  }

  openRegisterForm(): void {
    this.isOpenRegisterForm = true;
    this.store.dispatch(new IsErrorLoginFalse());
  }

  openLoginForm(): void {
    this.isOpenRegisterForm = false;
    this.store.dispatch(new IsErrorLoginFalse());
  }

  setErrorLogin(flag: boolean): void {
    if (flag) {
      this.store.dispatch(new IsErrorLoginTrue());
    } else {
      this.store.dispatch(new IsErrorLoginFalse());
      this.store.dispatch(new DisableBtnDeactivated());
    }
  }
}
