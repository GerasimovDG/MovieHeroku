import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IUserState } from "../state/user.state";

const selectUser = (state: IAppState) => state.user;

export const selectUserState = createSelector(
  selectUser,
  (state: IUserState) => state,
);

export const selectSelectedUser = createSelector(
  selectUser,
  (state: IUserState) => state.user,
);

export const selectDisableBtn = createSelector(
  selectUser,
  (state: IUserState) => state.disableBtn,
);

export const selectErrorLoginFlag = createSelector(
  selectUser,
  (state: IUserState) => state.isErrorLogin,
);

export const selectRegisteredFlag = createSelector(
  selectUser,
  (state: IUserState) => state.isRegistered,
);
