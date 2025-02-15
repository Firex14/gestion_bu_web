import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptor/auth-interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {KeycloakConfigService} from "./core/services/keycloak-config.service";

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
    provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync()
  ]
};
