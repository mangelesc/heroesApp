import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    // Load children -> lazy load
    // Children -> NO lazy load (Este módulo ya se está cargando en lazy load en el app.module)
    children: [
      {
        path: 'login', 
        component: LoginPageComponent
      }, 
      {
        path: 'signup', 
        component: RegisterPageComponent
      },
      {
        path: '**', 
        redirectTo: 'login'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
