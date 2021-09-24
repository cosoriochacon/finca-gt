import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialComponent } from './components/credential/credential.component';
import { ListCredentialComponent } from './components/credential/list-credential/list-credential.component';
import { LoginComponent } from './components/login/login.component';
import { ListMessageComponent } from './components/message/list-message/list-message.component';
import { MessageComponent } from './components/message/message.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'credential',
    component: CredentialComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'credential/list',
    component: ListCredentialComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'message',
    component: MessageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'message/list',
    component: ListMessageComponent,
    canActivate: [LoginGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
