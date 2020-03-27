import { Action } from "@ngrx/store";
import { User } from "../../shared/interfaces";

export enum USER_ACTIONS {
  LOGIN_USER = "[Auth] Login user",
  LOGIN_USER_END = "[Auth] Login user end",
  LOGOUT_USER = "[Auth] Logout user",
  REGISTRATION_USER = "[Auth] User registration",
  REGISTRATION_USER_END = "[Auth] User registration end",
  DISABLE_BTN_TRUE = "[Auth] Disable btn activated",
  DISABLE_BTN_FALSE = "[Auth] Disable btn deactivated",
  IS_ERROR_LOGIN_TRUE = "[Auth] Error login - TRUE",
  IS_ERROR_LOGIN_FALSE = "[Auth] Error login - FALSE",
  GET_USER_INFO = "[Auth] Get user info",
  GET_USER_INFO_SUCCESS = "[Auth] Get user info - success",
}

export class LoginUser implements Action {
  public readonly type = USER_ACTIONS.LOGIN_USER;
  constructor(public payload: User) {
  }
}

export class LogoutUser implements Action {
  public readonly type = USER_ACTIONS.LOGOUT_USER;
  constructor(public payload?: User) {
  }
}

export class RegistrationUser implements Action {
  public readonly type = USER_ACTIONS.REGISTRATION_USER;
  constructor(public payload: User) {
  }
}
export class RegistrationUserEnd implements Action {
  public readonly type = USER_ACTIONS.REGISTRATION_USER_END;
  constructor(public payload: boolean) {
  }
}

export class LoginUserEnd implements Action {
  public readonly type = USER_ACTIONS.LOGIN_USER_END;
  constructor(public payload: User) {
  }
}

export class DisableBtnActivated implements Action {
  public readonly type = USER_ACTIONS.DISABLE_BTN_TRUE;
}
export class DisableBtnDeactivated implements Action {
  public readonly type = USER_ACTIONS.DISABLE_BTN_FALSE;
}

export class IsErrorLoginTrue implements Action {
  public readonly type = USER_ACTIONS.IS_ERROR_LOGIN_TRUE;
}
export class IsErrorLoginFalse implements Action {
  public readonly type = USER_ACTIONS.IS_ERROR_LOGIN_FALSE;
}

export class GetCurrentUserInfo implements Action {
  public readonly type = USER_ACTIONS.GET_USER_INFO;
  constructor(public payload: string) {
  }
}
export class GetCurrentUserInfoSuccess implements Action {
  public readonly type = USER_ACTIONS.GET_USER_INFO_SUCCESS;
  constructor(public payload: User) {
  }
}

export type UserActions = LoginUser
  | LogoutUser
  | RegistrationUser
  | RegistrationUserEnd
  | LoginUserEnd
  | DisableBtnActivated | DisableBtnDeactivated
  | IsErrorLoginTrue    | IsErrorLoginFalse
  | GetCurrentUserInfo  | GetCurrentUserInfoSuccess;
