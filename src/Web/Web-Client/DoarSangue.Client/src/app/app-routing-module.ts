import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroParceirosComponent } from './pages/cadastro-parceiros/cadastro-parceiros.component';
import { InstituicaoDashboardComponent } from './pages/instituicao/instituicao-dashboard.component';
import { DoadorComponent } from './pages/doador/doador.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastroParceiros', component: CadastroParceirosComponent },
  { path: 'doador', component: DoadorComponent },
  { path: 'instituicao', component: InstituicaoDashboardComponent },
  { path: 'perfil', component: PerfilComponent },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
