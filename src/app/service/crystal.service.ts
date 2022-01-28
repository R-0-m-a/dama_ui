import {Injectable} from '@angular/core';
import {Crystal} from "../model/crystal.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CrystalService {
  private serverApiUrl = environment.SERVER_API_URL;

  constructor(private http: HttpClient) {
  }

  searchCrystal(identifier: string) {
    return this.http.get<Crystal>(`${this.serverApiUrl}/crystal/${identifier}`);
  }
}
