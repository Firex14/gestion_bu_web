import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {HeaderComponent} from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,
    RouterModule,
    SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {}

  title = 'gestion_bu_web';
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
