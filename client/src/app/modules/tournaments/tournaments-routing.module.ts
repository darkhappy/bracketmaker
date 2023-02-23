import {RouterModule, Routes} from '@angular/router';
import { CreateComponent } from "@modules/tournaments/crud/create/create.component";
import { UpdateTournamentComponent } from "@modules/tournaments/crud/update-tournament/update-tournament.component";
import {TournamentProfileComponent} from "@modules/tournaments/pages/tournament-profile/tournament-profile.component";


const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: ':id',
    component: TournamentProfileComponent,
  },
  { path: 'update/:details',
    component: UpdateTournamentComponent
  }
];

export const tournamentRoutes = RouterModule.forChild(routes);
