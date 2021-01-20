import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Student1Component } from '../student1/student1.component'
import { Studentt2Component } from '../studentt2/studentt2.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, Student1Component, Studentt2Component],// 声明
  entryComponents: [Student1Component, Studentt2Component] // 导出
})
export class HomePageModule { }
