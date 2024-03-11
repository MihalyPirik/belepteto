import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) {

  }

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
      icon: 'pi pi-fw pi-user',
      routerLink: "/login",
      id: "login-menu-item"
    },
    {
      label: "",
      icon: 'pi pi-fw pi-user',
      id: "logged-user-item",
      visible: false,
      items: [{
        label: "Kijelentkezés",
        command: () => {
          this.httpService.logout();
        }
      }]
    }
  ];

  ngOnInit(): void {
    this.httpService.loginStatusChanged.subscribe({
      next: () => {
        const loginMenuItem = this.menuItems.filter(m => m.id === "login-menu-item")[0];
        const loggedUserMenuItem = this.menuItems.filter(m => m.id === "logged-user-item")[0];
        if (this.httpService.userData.token) {
          loginMenuItem.visible = false;
          loggedUserMenuItem.visible = true;
          loggedUserMenuItem.label = this.httpService.userData.name;
        }
        else {
          loginMenuItem.visible = true;
          loggedUserMenuItem.visible = false;
        }
      }
    });
    this.httpService.checkUserData();
  }
}
