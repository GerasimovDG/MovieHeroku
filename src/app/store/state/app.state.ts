import { initialUserState, IUserState } from "./user.state";

export interface IAppState {
  user: IUserState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
};

export function getInitialState(): IAppState {
 return initialAppState;
}
