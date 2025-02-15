import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloakService: KeycloakService
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
  ): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloakService.login();
      return false;
    }

    const requiredRoles = route.data['roles'] as string[] || [];

    if (requiredRoles.length === 0) {
      return true;
    }

    const hasAccess = requiredRoles.some(role => this.roles.includes(role));

    if (!hasAccess) {
      await this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
