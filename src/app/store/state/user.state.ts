import { User } from "../../shared/interfaces";

export interface IUserState {
  user: User;
  disableBtn: boolean;
  isErrorLogin: boolean;
  isRegistered: boolean;
}

export const initialUserState: IUserState = {
  user: {
    name: "", login: "", password: ""
  },
  disableBtn: false,
  isErrorLogin: false,
  isRegistered: false,
};
