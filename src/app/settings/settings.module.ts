import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';


@NgModule({
  declarations: [
    ChangeUserDataComponent,
    ChangeUserPasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
