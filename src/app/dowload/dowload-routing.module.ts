import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DowloadPage } from './dowload.page';

const routes: Routes = [
  {
    path: '',
    component: DowloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DowloadPageRoutingModule {}
