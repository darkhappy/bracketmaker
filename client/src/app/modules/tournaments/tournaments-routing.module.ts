import {RouterModule, Routes} from '@angular/router';
import { CreateComponent } from "@modules/tournaments/crud/create/create.component";


const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },

];

export const tournamentRoutes = RouterModule.forChild(routes);
