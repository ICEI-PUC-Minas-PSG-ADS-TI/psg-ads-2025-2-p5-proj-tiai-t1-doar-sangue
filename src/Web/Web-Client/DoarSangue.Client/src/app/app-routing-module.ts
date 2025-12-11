import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroParceirosComponent } from './pages/cadastro-parceiros/cadastro-parceiros.component';
import { DoadorComponent } from './pages/doador/doador.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastroParceiros', component: CadastroParceirosComponent },
  { path: 'doador', component: DoadorComponent },

  {
    path: 'instituicao',
    loadComponent: () =>
      import('./pages/instituicao/instituicao-dashboard.component')
        .then(m => m.InstituicaoDashboardComponent)
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
