import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../core/services/user.service";
interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    MatIcon,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  @Input() isOpen = false;
  menuItems: MenuItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard', route: '/dashboard', roles: [] },
    { label: 'Livres', icon: 'book', route: '/books', roles: [] },
    { label: 'Lecteurs', icon: 'groups', route: '/readers', roles: [] },
    { label: 'Utilisateurs', icon: 'people', route: '/users', roles: ['admin'] }
  ];

  filteredMenuItems: MenuItem[] = [];
  user: any;
  userRole: string = "";
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.userInfo$.subscribe((userInfo) => {
      if (userInfo && userInfo.roles && userInfo.roles.length > 0) {
        this.user = userInfo;
        this.userRole = userInfo.roles[0];
        this.filteredMenuItems = this.menuItems.filter(item =>
          item.roles.length === 0 || item.roles.includes(this.userRole)
        );
      }
    });

  }

}
