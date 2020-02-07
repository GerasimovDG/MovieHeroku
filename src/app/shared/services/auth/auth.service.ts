import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataLists } from "../../../data/data-lists";
import { User } from "../../interfaces";
import { AuthDataService } from "../data.service";

@Injectable({
  providedIn: "root"
})
export class AuthService extends AuthDataService {

  login(user: User): Observable<User> {
    // в цикле ищем юзера в UserList если нашли. возвращаем.
    const tmp = DataLists.users.find( item =>  item.login === user.login && item.password === user.password);
    return of(tmp);
  }

  register(user: User): Observable<boolean> {
    if (!!DataLists.users.find( item =>  item.login === user.login)) {
      return of(false);
    }
    DataLists.users.push(user);
    return of(true);
  }

}
