import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { BookingInfo, Film, FilmSessionTime, ScreeningPeriod, Theater, User } from "../interfaces";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class ServerDataHandlerService extends DataService {

  constructor(private http: HttpClient) {
    super();
  }

  getFilmsList(): Observable<Film[]> {
    return this.http.get<Film[]>(environment.apiUrl + "/films");
  }

  getFilmByID(id: number): Observable<Film> {
    return this.http.get<Film>(environment.apiUrl + "/films/" + id );
  }

  getCinemasList(): Observable<Theater[]> {
    return this.http.get<Theater[]>(environment.apiUrl + "/theaters");
  }

  getFilmSessions(filmName: string): Observable<FilmSessionTime[]> {
    return this.http.get<FilmSessionTime[]>(environment.apiUrl + "/filmSession/" + filmName);
  }

  getScreeningPeriod(filmName: string): Observable<ScreeningPeriod[]> {
    return this.http.get<ScreeningPeriod[]>(environment.apiUrl + "/filmScreening/" + filmName);
  }

  editPlaces(bookingInfo: BookingInfo): Observable<boolean> {
    return this.http.put<boolean>(environment.apiUrl + "/filmSession", bookingInfo);
  }

  setSelectedPlaces(info: BookingInfo): Observable<boolean> {
    this.bookingInfo = info;
    return this.editPlaces(info);
  }

  getCurrentUser(login: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + "/users/" + login);
  }
}
