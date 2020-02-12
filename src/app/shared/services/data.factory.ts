import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { ServerAuthService } from "./auth/server-auth.service";
import { DataHandlerService } from "./data-handler.service";
import { ServerDataHandlerService } from "./server-data-handler.service";

export const authFactory = (route: ActivatedRoute, http: HttpClient) => {

  const tmp = route.snapshot.queryParams.serv;
  if (!!tmp) {
    return new AuthService();
  }
  return new ServerAuthService(http);
};


export const dataFactory = (route: ActivatedRoute, http: HttpClient) => {

  const tmp = route.snapshot.queryParams.serv;
  if (!!tmp) {
    return new DataHandlerService();
  }
  return new ServerDataHandlerService(http);
};
