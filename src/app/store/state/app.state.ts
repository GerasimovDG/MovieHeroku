import { IFilmsState, initialFilmsState } from "./films.state";
import { initialUserState, IUserState } from "./user.state";

export interface IAppState {
  user: IUserState;
  films: IFilmsState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  films: initialFilmsState,
};

export function getInitialState(): IAppState {
 return initialAppState;
}
