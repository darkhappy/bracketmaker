import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "@modules/home/pages/index/index.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  }
];

export const homeRoutes = RouterModule.forChild(routes);
