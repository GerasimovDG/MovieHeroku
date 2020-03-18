import { USER_ACTIONS, UserActions } from "../actions/user.actions";
import { initialUserState, IUserState } from "../state/user.state";

export const userReducers = (
  state = initialUserState,
  action: UserActions,
): IUserState => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ACTIONS.LOGOUT_USER:
      return {
        ...state,
        user: {name: "", login: "", password: ""}
      };
    case USER_ACTIONS.REGISTRATION_USER:
      return {
        ...state,
      };
    case USER_ACTIONS.REGISTRATION_USER_END:
      return {
        ...state,
        isRegistered: action.payload,
      };
    case USER_ACTIONS.LOGIN_USER_END:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ACTIONS.DISABLE_BTN_TRUE:
      return {
        ...state,
        disableBtn: true,
      };
    case USER_ACTIONS.DISABLE_BTN_FALSE:
      return {
        ...state,
        disableBtn: false,
      };
    case USER_ACTIONS.IS_ERROR_LOGIN_TRUE:
      return {
        ...state,
        isErrorLogin: true,
      };
    case USER_ACTIONS.IS_ERROR_LOGIN_FALSE:
      return {
        ...state,
        isErrorLogin: false,
      };
    default:
      return state;
  }
};


