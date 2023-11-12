import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    // Lo cargamos mediante LazyLoad 
    loadChildren: () => import('./auth/auth.module').then ( m => m.AuthModule),
  },
  {
    path: 'heroes',
    // Lo cargamos mediante LazyLoad 
    loadChildren: () => import('./heroes/heroes.module').then ( m => m.HeroesModule),
  }, 
  {
    path: '404', 
    component: Error404PageComponent,
  },
  {
    // Path por defecto
    path: '',
    redirectTo: 'heroes',
    // para que el path sea exactamente '' y las demas rutas no pasen por aquí 
    pathMatch: 'full'
  }, 
  {
    // Cualquier otro path
    path: '**', 
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
