import {RouterModule, Routes} from '@angular/router';
import { CreateComponent } from "@modules/tournaments/crud/create/create.component";
import { TournamentListComponent } from "@modules/tournaments/pages/tournament-list/tournament-list.component";


const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'list',
    component: TournamentListComponent,
  }
];

export const tournamentRoutes = RouterModule.forChild(routes);
