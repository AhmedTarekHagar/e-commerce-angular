import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {path: "", redirectTo: "changeuserdata", pathMatch: "full"},
  {path: "changeuserdata", component: ChangeUserDataComponent, title: "Update Your Information"},
  {path: "changepassword", component: ChangeUserPasswordComponent, title: "Change Your Password"},
  {path: "**", component : NotFoundComponent, title: "Content Not Found"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
