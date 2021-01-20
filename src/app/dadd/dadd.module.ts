import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaddPageRoutingModule } from './dadd-routing.module';

import { DaddPage } from './dadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaddPageRoutingModule
  ],
  declarations: [DaddPage]
})
export class DaddPageModule {}
