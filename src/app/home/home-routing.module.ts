import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { Student1Component } from '../student1/student1.component'
import { Studentt2Component } from '../studentt2/studentt2.component'
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: "list",
        component: Student1Component
      },
      {
        path: "detail",
        component: Studentt2Component
      },
      {
        path: "",
        redirectTo: "list",
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
