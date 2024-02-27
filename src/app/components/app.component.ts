import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      label: "Dolgozók",
      icon: "pi pi-fw pi-users",
      routerLink: "/employees"
    },
    {
      label: "Olvasók - helyiség",
      icon: "pi pi-fw pi-cog",
      routerLink: "/readers"
    },
    {
      label: "Mozgások",
      icon: "pi pi-fw pi-calendar",
      routerLink: "/moves",
    },
    {
      label: "Bejelentkezés",
      routerLink: "/login",
      icon: 'pi pi-fw pi-user',
      id: "login-menu-item"
    }
  ];
}
