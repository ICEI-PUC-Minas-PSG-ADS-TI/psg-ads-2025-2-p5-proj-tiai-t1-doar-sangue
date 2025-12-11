import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroParceirosComponent } from './pages/cadastro-parceiros/cadastro-parceiros.component';
import { DoadorComponent } from './pages/doador/doador.component';
import { InstituicaoDashboardComponent } from './pages/instituicao/instituicao-dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

@NgModule({
  declarations: [
    App,
    CadastroComponent,
    LoginComponent,
    CadastroParceirosComponent,
    DoadorComponent,
    PerfilComponent,
    InstituicaoDashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
