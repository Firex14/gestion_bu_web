import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfoSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);  // Valeur initiale = null
  userInfo$: Observable<any> = this.userInfoSubject.asObservable();  // Observable public

  constructor(private keycloakService: KeycloakService) {
    this.loadUserInfo();  // Charger les infos utilisateur lors de l'initialisation du services
  }

  private loadUserInfo(): void {
    this.keycloakService.getKeycloakInstance().loadUserProfile()
      .then((userProfile) => {
        const roles = this.filterRoles(this.keycloakService.getUserRoles());
        this.userInfoSubject.next({userProfile, roles});  // Mettre à jour la valeur du BehaviorSubject
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        this.userInfoSubject.next(null);  // En cas d'erreur, on met la valeur à null
      });
  }

  private filterRoles(roles: string[]): string[] {
    const defaultRoles = ['view-profile','default-roles-app_realm','offline_access', 'uma_authorization', 'realm-management', 'manage-account', 'manage-account-links'];
    return roles.filter(role => !defaultRoles.includes(role));
  }

  getConnectedUserInfo(): Promise<any> {
    return this.keycloakService.getKeycloakInstance().loadUserProfile();
  }
}
