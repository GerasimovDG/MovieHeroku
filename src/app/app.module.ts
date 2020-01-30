import { LOCALE_ID, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Ng5SliderModule } from "ng5-slider";
import { CookieService } from "ngx-cookie-service";

import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookingPageComponent } from "./booking-page/booking-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PasswordEyeDirective } from "./directives/password-eye.directive";
import { PageNotFoundComponent } from "./error-pages/page-not-found/page-not-found.component";
import { FilmInformationPageComponent } from "./film-information-page/film-information-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { FilmComponent } from "./shared/components/film/film.component";

registerLocaleData(localeRu, "ru");

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginPageComponent,
    DashboardComponent,
    FilmInformationPageComponent,
    BookingPageComponent,
    PageNotFoundComponent,
    PasswordEyeDirective,
    FilmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng5SliderModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: "ru" }, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
