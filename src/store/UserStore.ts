import { makeAutoObservable } from "mobx";
import { IUser } from "./type";

export default class UserStore {
  private _isAuth: boolean = false;
  private _user: IUser = {
    email: "",
    password: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: IUser) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
