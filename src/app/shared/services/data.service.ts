import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces";

@Injectable({providedIn: "root"})
export abstract class AuthDataService {

  abstract login(user: User): Observable<boolean>;
}
