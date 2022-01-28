import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PriceConfig} from "../model/price-config.model";

@Injectable({
  providedIn: 'root'
})
export class PriceConfigService {
  private serverApiUrl = environment.SERVER_API_URL;

  constructor(private http: HttpClient) { }

  getPriceConfig(): Observable<PriceConfig> {
    return this.http.get<PriceConfig>(`${this.serverApiUrl}/priceConfig`);
  }

  update(priceConfig: PriceConfig): Observable<PriceConfig> {
    return this.http.put<PriceConfig>(`${this.serverApiUrl}/priceConfig`, priceConfig);
  }
}
