import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TerminalComponent } from './components/terminal/terminal.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'readers', component: TerminalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
