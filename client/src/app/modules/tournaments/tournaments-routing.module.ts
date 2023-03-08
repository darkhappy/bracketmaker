import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '@modules/tournaments/crud/create/create.component';
import { ContentLayoutComponent } from '../../layout/content-layout/content-layout.component';
import { TournamentProfileComponent } from '@modules/tournaments/pages/tournament-profile/tournament-profile.component';
import { TournamentListComponent } from '@modules/tournaments/pages/tournament-list/tournament-list.component';
import { UpdateTournamentComponent } from '@modules/tournaments/crud/update-tournament/update-tournament.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'list',
    component: TournamentListComponent,
  },
  { path: 'update/:details', component: UpdateTournamentComponent },
  {
    path: 'profile/:id',
    component: TournamentProfileComponent,
  },
];

export const tournamentRoutes = RouterModule.forChild(routes);
