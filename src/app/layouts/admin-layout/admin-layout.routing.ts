import {Routes} from '@angular/router';

import {
    EarringPartListComponent
} from "../../components/earring/earring-part-management/list/earring-part-list.component";
import {
    EarringPartCreateComponent
} from "../../components/earring/earring-part-management/create/earring-part-create.component";
import {UploadListComponent} from "../../components/upload/upload-list/upload-list.component";
import {DocsComponent} from "../../components/docs/docs.component";
import {EarringListComponent} from "../../components/earring/earring-management/list/earring-list.component";
import {PriceConfigComponent} from "../../components/price-config/price-config.component";
import {EarringCreateComponent} from "../../components/earring/earring-management/create/earring-create.component";
import {EarringDetailsComponent} from "../../components/earring/earring-management/details/earring-details.component";
import {LoginComponent} from "../../components/login/login.component";
import {Authority} from "../../config/authority.constants";
import {UserRouteAccessService} from "../../service/user-route-access.service";
import {RegisterComponent} from "../../components/register/register.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: 'earringDetails',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    component: EarringPartListComponent
  },
  {path: 'earrings', data: {
      authorities: [Authority.ADMIN, Authority.USER],
    },
    canActivate: [UserRouteAccessService],
    component: EarringListComponent},
  {
    path: 'updateEarringPart/:id',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    component: EarringPartCreateComponent
  },
  {
    path: 'updateEarring/:id', data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    component: EarringCreateComponent
  },
  {path: 'earrings/:id', component: EarringDetailsComponent},
  {path: 'addEarringPart', component: EarringPartCreateComponent},
  {
    path: 'uploadImages', data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    component: UploadListComponent
  },
  {
    path: 'docs', data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    component: DocsComponent
  },
  {
    path: 'priceConfig', data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    component: PriceConfigComponent
  },
  {
    path: 'addEarring',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    component: EarringCreateComponent
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
