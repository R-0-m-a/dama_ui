import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  swaggerUrl!: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.swaggerUrl= this.sanitizer.bypassSecurityTrustResourceUrl(environment.SWAGGER_URL);
  }

}
