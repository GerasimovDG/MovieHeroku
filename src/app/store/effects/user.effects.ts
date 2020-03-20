import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { map, switchMap } from "rxjs/operators";
import { User } from "../../shared/interfaces";
import { AuthDataService, DataService } from "../../shared/services/data.service";
import { DisableBtnDeactivated, IsErrorLoginFalse, IsErrorLoginTrue, LoginUser, LoginUserEnd, RegistrationUser, RegistrationUserEnd, USER_ACTIONS, } from "../actions/user.actions";
import { IAppState } from "../state/app.state";

@Injectable()
export class UserEffects {
  @Effect()
  loginUser$ = this._actions$.pipe(
    ofType<LoginUser>(USER_ACTIONS.LOGIN_USER),
    map( action => action.payload),
    switchMap((user: User) => {
      return this._userService.login(user)
       .pipe(map((usr: User ) => {
           if (!!usr) {
             // 0.000231481 - 20 секунд в днях, 0,00694444 - 10 минут 0.0208333 - 30 минут
             this.cookieService.set("login", usr.login, 0.0208333, "/", null, null, "Strict");

             this.data.currentUser = usr;
             this._store.dispatch(new IsErrorLoginFalse());
             this.router.navigate(["dashboard"]);
           } else {
             this._store.dispatch(new IsErrorLoginTrue());
           }
           this._store.dispatch(new DisableBtnDeactivated());
         return new LoginUserEnd(user);
       }));
    }),
  );

  @Effect()
  registeredUser$ = this._actions$.pipe(
    ofType<RegistrationUser>(USER_ACTIONS.REGISTRATION_USER),
    map( action => action.payload),
    switchMap( (user: User) => {
      return this._userService.register(user)
        .pipe(map((isRegistered: boolean ) => {
          if (!isRegistered) {
            this._store.dispatch(new IsErrorLoginTrue());
          } else {
            this._store.dispatch(new LoginUser(user));
          }
          return new RegistrationUserEnd(isRegistered);
        }));
    }),
  );

  constructor(private _userService: AuthDataService,
              private cookieService: CookieService,
              private router: Router,
              private data: DataService,
              private _actions$: Actions,
              private _store: Store<IAppState>) {
  }
}
