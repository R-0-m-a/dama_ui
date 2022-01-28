import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {EarringPartListComponent} from './components/earring/earring-part-management/list/earring-part-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {UploadFormComponent} from './components/upload/upload-form/upload-form.component';
import {UploadDetailsComponent} from './components/upload/upload-details/upload-details.component';
import {UploadListComponent} from './components/upload/upload-list/upload-list.component';
import {AppRoutingModule} from './app-routing.module';
import {
    EarringPartDeleteDialogComponent
} from './components/dialog/earring-part-delete-dialog/earring-part-delete-dialog.component';
import {DocsComponent} from './components/docs/docs.component';
import {
    EarringPartCreateComponent
} from './components/earring/earring-part-management/create/earring-part-create.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FooterComponent} from './components/footer/footer.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminLayoutModule} from "./layouts/admin-layout/admin-layout.module";
import {RouterModule} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {MatCardModule} from "@angular/material/card";
import {EarringListComponent} from './components/earring/earring-management/list/earring-list.component';
import {PriceConfigComponent} from './components/price-config/price-config.component';
import {EarringCreateComponent} from './components/earring/earring-management/create/earring-create.component';
import {EarringDeleteDialogComponent} from './components/dialog/earring-delete-dialog/earring-delete-dialog.component';
import {
    EarringPartListDialogComponent
} from './components/dialog/earring-part-list-dialog/earring-part-list-dialog.component';
import {
    EarringTemporaryPartComponent
} from './components/earring/earring-tempory-part/earring-temporary-part.component';
import {
    EarringTemporaryPartListDialogComponent
} from './components/dialog/earring-temporary-part-list-dialog/earring-temporary-part-list-dialog.component';
import {EarringDetailsComponent} from './components/earring/earring-management/details/earring-details.component';
import {ImgDialogComponent} from './components/dialog/img-dialog/img-dialog.component';
import {LoginComponent} from './components/login/login.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {httpInterceptorProviders} from "./interceptor";
import {HasAnyAuthorityDirective} from './has-any-authority.directive';
import {RegisterComponent} from './components/register/register.component';
import {CrystalDialogComponent} from './components/dialog/crystal-dialog/crystal-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EarringPartListComponent,
    UploadFormComponent,
    UploadDetailsComponent,
    UploadListComponent,
    EarringPartDeleteDialogComponent,
    DocsComponent,
    EarringPartCreateComponent,
    SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    EarringListComponent,
    PriceConfigComponent,
    EarringCreateComponent,
    EarringDeleteDialogComponent,
    EarringPartListDialogComponent,
    EarringTemporaryPartComponent,
    EarringTemporaryPartListDialogComponent,
    EarringDetailsComponent,
    ImgDialogComponent,
    LoginComponent,
    HasAnyAuthorityDirective,
    RegisterComponent,
    CrystalDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminLayoutModule,
    RouterModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    NgxMatFileInputModule,
    MatCardModule,
    FormsModule,
    NgxWebstorageModule.forRoot({prefix: 'jhi', separator: '-', caseSensitive: true}),
    MatProgressSpinnerModule,
  ],
  providers: [ httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
