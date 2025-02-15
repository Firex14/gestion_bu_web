import { Injectable } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KeycloakConfigService {
  private url = environment.keycloakUrl
  private realm = environment.realm
  private clientId = environment.clientId
  userData: any;

  constructor(private keycloak: KeycloakService) {}

  async init(): Promise<void> {
    try {
      await this.keycloak.init({
        config: {
          url: this.url,
          realm: this.realm,
          clientId: this.clientId
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
          responseMode: 'fragment',
        }
      });
      this.userData = this.keycloak.getKeycloakInstance();

    } catch (error) {
      console.error('error Keycloak', error);
    }
  }

}
