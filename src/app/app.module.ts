import { registerLocaleData } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import localeRu from "@angular/common/locales/ru";
import { LOCALE_ID, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { Ng5SliderModule } from "ng5-slider";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../environments/environment";
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
import { authFactory, dataFactory } from "./shared/services/data.factory";
import { AuthDataService, DataService } from "./shared/services/data.service";
import { UserEffects } from "./store/effects/user.effects";
import { appReducers } from "./store/reducers/app.reducers";

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
    HttpClientModule,
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    { provide: AuthDataService, useFactory: authFactory, deps: [ActivatedRoute, HttpClient], },
    { provide: DataService, useFactory: dataFactory, deps: [ActivatedRoute, HttpClient], },
    { provide: LOCALE_ID, useValue: "ru", },
    CookieService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
