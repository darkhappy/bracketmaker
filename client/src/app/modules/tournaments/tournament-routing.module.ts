import {RouterModule, Routes} from '@angular/router';
import { TournamentListComponent } from "@modules/tournaments/pages/tournament-list/tournament-list.component";

const routes: Routes = [
  {
    path: 'list',
    component: TournamentListComponent,
  }
];

export const tournamentRoutes = RouterModule.forChild(routes);
