import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { userReducers } from "./user.reducers";

// tslint:disable-next-line:no-any
export const appReducers: ActionReducerMap<IAppState, any> = {
  user: userReducers,
};
