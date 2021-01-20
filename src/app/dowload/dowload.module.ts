import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DowloadPageRoutingModule } from './dowload-routing.module';

import { DowloadPage } from './dowload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DowloadPageRoutingModule
  ],
  declarations: [DowloadPage]
})
export class DowloadPageModule {}
