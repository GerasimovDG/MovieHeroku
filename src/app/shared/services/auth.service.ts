import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataLists } from "../../data/data-lists";
import { User } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  login(user: User): Observable<boolean> {
    // в цикле ищем юзера в UserList если нашли. возвращаем.
    const tmp = !!DataLists.users.find( item =>  item.login === user.login && item.password === user.password);
    return of(tmp);
  }
}
