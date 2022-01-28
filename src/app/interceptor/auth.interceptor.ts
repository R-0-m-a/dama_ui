import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthJwtService} from "../service/auth-jwt.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authJwtService: AuthJwtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const serverApiUrl = environment.SERVER_API_URL;
    if (!request.url || (request.url.startsWith('http') && !(serverApiUrl && request.url.startsWith(serverApiUrl)))) {
      return next.handle(request);
    }

    const token = this.authJwtService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
