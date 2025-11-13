import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { DoadorDashboardComponent } from './pages/doador/doador-dashboard.component';
const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'dashboard-doador', component: DoadorDashboardComponent },
  { path: '', redirectTo: '/dashboard-doador', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
