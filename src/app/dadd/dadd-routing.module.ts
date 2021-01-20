import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaddPage } from './dadd.page';

const routes: Routes = [
  {
    path: '',
    component: DaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaddPageRoutingModule {}
