import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { ServerAuthService } from "./auth/server-auth.service";

export const authFactory = (route: ActivatedRoute, http: HttpClient) => {

  const tmp = route.snapshot.queryParams.serv;
  if (!!tmp) {
    return new ServerAuthService(http);
  }
  return new AuthService();
};
