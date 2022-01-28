import {Injectable} from '@angular/core';
import {Registration} from "../model/registration.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private serverApiUrl = environment.SERVER_API_URL;

  constructor(private http: HttpClient) {}

  save(registration: Registration): Observable<{}> {
    return this.http.post(`${this.serverApiUrl}/register`, registration);
  }
}
