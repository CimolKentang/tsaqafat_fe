import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiographyComponent } from './biography.component';
import { BiographyCreateComponent } from './biography-create/biography-create.component';
import { BiographyDetailComponent } from './biography-detail/biography-detail.component';
import { BiographyEditComponent } from './biography-edit/biography-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BiographyComponent
  },
  {
    path: 'create',
    component: BiographyCreateComponent
  },
  {
    path: 'detail/:id',
    component: BiographyDetailComponent
  },
  {
    path: 'edit/:id',
    component: BiographyEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiographyRoutingModule { }
