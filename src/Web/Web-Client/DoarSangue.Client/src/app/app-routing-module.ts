import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroParceirosComponent } from './pages/cadastro-parceiros/cadastro-parceiros.component';

const routes: Routes = [
  { path: '', redirectTo: 'instituicao', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastroParceiros', component: CadastroParceirosComponent },

  {
    path: 'nova-campanha',
    loadComponent: () =>
      import('./pages/criar-campanha/criar-campanha.component')
        .then(m => m.CriarCampanhaComponent)
  },

  {
    path: 'instituicao',
    loadComponent: () =>
      import('./pages/instituicao/instituicao-dashboard.component')
        .then(m => m.InstituicaoDashboardComponent)
  },

  {
    path: 'doador',
    loadComponent: () =>
      import('./pages/doador/doador.component')
        .then(m => m.DoadorComponent)
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
