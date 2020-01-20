import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UsersList } from "../data/users-list";
import { User } from "./interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  login(user: User): Observable<boolean> {
    // в цикле ищем юзера в UserList если нашли. возвращаем.
    const tmp = !!UsersList.users.find( item =>  item.login === user.login && item.password === user.password);
    return of(tmp);
  }
}
