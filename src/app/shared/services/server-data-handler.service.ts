import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Film } from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class ServerDataHandlerService {

  constructor(private http: HttpClient) {
  }

  getFilmsList(): Observable<Film[]> {
    return this.http.get<Film[]>(environment.apiUrl + "/films");
  }
}
