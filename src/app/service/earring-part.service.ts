import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {EarringPart} from "../model/earring-part.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {FileUploadService} from "./file-upload.service";

@Injectable({
  providedIn: 'root'
})
export class EarringPartService {

  private serverApiUrl = environment.SERVER_API_URL;

  constructor(private http: HttpClient, private applicationConfigService: AppConfigService, private fileUploadService: FileUploadService) {
  }

  getEarringDetails(): Observable<EarringPart[]> {
    return this.http.get<EarringPart[]>(`${this.serverApiUrl}/earringParts`);
  }

  getEarringPart(id: string): Observable<EarringPart> {
    return this.http.get<EarringPart>(`${this.serverApiUrl}/earringParts/${id}`);
  }

  deleteEarringPart(id: string): Observable<{}> {
   // this.deleteImgForEarringPart(id);
    return this.http.delete(`${this.serverApiUrl}/earringParts/${id}`);
  }

  deleteImgForEarringPart(id: string) {
    this.getEarringPart(id).subscribe(earringPart => {
      if (earringPart && earringPart.imageUrl) {
        this.fileUploadService.deleteFileByImgUrl(earringPart.imageUrl);
      }
    })
  }

  update(earringPart: EarringPart, oldEarringPart?: EarringPart): Observable<EarringPart> {

    if (oldEarringPart && oldEarringPart.imageUrl && oldEarringPart.imageUrl != earringPart.imageUrl) {
      this.fileUploadService.deleteFileByImgUrl(oldEarringPart.imageUrl);
    }
    return this.http.put<EarringPart>(`${this.serverApiUrl}/earringParts`, earringPart);
  }

  save(earringPart: EarringPart): Observable<EarringPart> {
    return this.http.post<EarringPart>(`${this.serverApiUrl}/earringParts`, earringPart);
  }

}
