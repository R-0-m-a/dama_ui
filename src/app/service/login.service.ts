import {Injectable} from '@angular/core';
import {AccountService} from "./account.service";
import {AuthJwtService} from "./auth-jwt.service";
import {Login} from "../model/login.model";
import {Account} from "../model/account.model";
import {Observable} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private accountService: AccountService, private authServerProvider: AuthJwtService) {}


  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
