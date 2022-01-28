// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {firebase} from "./firebase.environment";

export const environment = {
  production: false,
  ...firebase,
  SERVER_API_URL: 'http://localhost:8080/earringApi',
  SWAGGER_URL: 'http://localhost:8080/earringApi/swagger-ui.html',
  sidebarBackground: 'https://firebasestorage.googleapis.com/v0/b/dama-firebase.appspot.com/o/uploads%2Fimages%2Fbackground.jpeg?alt=media&token=4fb80f53-9ea5-42ef-8653-b8c82d31ca38',
  background: 'https://firebasestorage.googleapis.com/v0/b/dama-firebase.appspot.com/o/uploads%2Fimages%2Fbg.jpeg?alt=media&token=ddf507bb-2b33-4e10-bc58-2d6c7c4f7c75',
  logoUrl: 'https://firebasestorage.googleapis.com/v0/b/dama-firebase.appspot.com/o/uploads%2Fimages%2Flogo.png?alt=media&token=e9646c8e-74f4-435a-84d2-a21b5ab64663',
  damaIco: 'https://firebasestorage.googleapis.com/v0/b/dama-firebase.appspot.com/o/uploads%2Fimages%2Flogo_4NB_icon.ico?alt=media&token=d80e2aa1-59a2-41c5-966d-0d571d3cf37d'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
