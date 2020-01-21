import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookingPageComponent } from "./booking-page/booking-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./error-pages/page-not-found/page-not-found.component";
import { FilmInformationPageComponent } from "./film-information-page/film-information-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { AuthGuard } from "./shared/auth.guard";


const routes: Routes = [
  { path: "", component: MainLayoutComponent, children: [
      { path: "", redirectTo: "/signin", pathMatch: "full", canActivate: [AuthGuard]},
      { path: "dashboard", component: DashboardComponent},
      { path: "film-information/:id", component: FilmInformationPageComponent},
      { path: "booking", component: BookingPageComponent},
    ], canActivateChild: [AuthGuard] },
  { path: "signin", component: LoginPageComponent},
  { path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class   AppRoutingModule { }
