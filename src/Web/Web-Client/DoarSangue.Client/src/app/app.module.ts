import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ADICIONE ESTA LINHA

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroParceirosComponent } from './pages/cadastro-parceiros/cadastro-parceiros.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';

@NgModule({
  declarations: [
    App,
    CadastroComponent,
    LoginComponent,
    CadastroParceirosComponent,
    AgendamentoComponent 
  ],
  imports: [
    BrowserModule,
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
