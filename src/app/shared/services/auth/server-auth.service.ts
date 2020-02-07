import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { User } from "../../interfaces";
import { AuthDataService } from "../data.service";

@Injectable({
  providedIn: "root"
})
export class ServerAuthService extends AuthDataService {

  constructor(private http: HttpClient) {
    super();
  }

  login(user: User): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${user.login}/${user.password}`);
  }

  register(user: User): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + "/users", user);
  }
}
