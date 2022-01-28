import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {Login} from "../model/login.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

type JwtToken = {
  id_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {
  private serverApiUrl = environment.SERVER_API_URL;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.localStorageService.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.sessionStorageService.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(`${this.serverApiUrl}/authenticate`, credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.localStorageService.clear('authenticationToken');
      this.sessionStorageService.clear('authenticationToken');
      this.sessionStorageService.clear('tempEarringParts');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      this.localStorageService.store('authenticationToken', jwt);
      this.sessionStorageService.clear('authenticationToken');
    } else {
      this.sessionStorageService.store('authenticationToken', jwt);
      this.localStorageService.clear('authenticationToken');
    }
  }
}
