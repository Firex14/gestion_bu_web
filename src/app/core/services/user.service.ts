import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import {BaseApiService} from "./base_api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService{
  private userInfoSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userInfo$: Observable<any> = this.userInfoSubject.asObservable();

  constructor(http:HttpClient, private keycloakService: KeycloakService) {
    super(http,"users" );
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    this.keycloakService.getKeycloakInstance().loadUserProfile()
      .then((userProfile) => {
        const roles = this.filterRoles(this.keycloakService.getUserRoles());
        this.userInfoSubject.next({userProfile, roles});
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        this.userInfoSubject.next(null);
      });
  }

  private filterRoles(roles: string[]): string[] {
    const defaultRoles = ['view-profile','default-roles-app_realm','offline_access', 'uma_authorization', 'realm-management', 'manage-account', 'manage-account-links'];
    return roles.filter(role => !defaultRoles.includes(role));
  }
}
