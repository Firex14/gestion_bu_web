import { ApplicationConfig, APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./core/interceptor/auth-interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {KeycloakConfigService} from "./core/services/keycloak-config.service";
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export function initializeKeycloak(keycloakConfig: KeycloakConfigService) {
  return () => keycloakConfig.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    KeycloakService,
    KeycloakConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        deps: [KeycloakConfigService],
        multi: true,
    },
    provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync(),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
