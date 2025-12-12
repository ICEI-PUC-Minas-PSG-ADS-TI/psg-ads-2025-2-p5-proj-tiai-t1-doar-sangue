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
import { PerfilComponent } from './pages/perfil/perfil.component';

// ❌ REMOVIDOS → São STANDALONE
// import { DoadorComponent } from './pages/doador/doador.component';
// import { InstituicaoDashboardComponent } from './pages/instituicao/instituicao-dashboard.component';

@NgModule({
  declarations: [
    App,
    CadastroComponent,
    LoginComponent,
    CadastroParceirosComponent,
    PerfilComponent
    // ❌ NÃO coloque standalone aqui
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // ❌ Standalone NÃO entra aqui, a não ser que sejam usados em templates
    // InstituicaoDashboardComponent,
    // DoadorComponent
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
