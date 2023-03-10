import { Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {TournamentService} from "@data/services/tournament.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-followed-tournaments',
  templateUrl: './followed-tournaments.component.html',
  styleUrls: ['./followed-tournaments.component.scss']
})
export class FollowedTournamentsComponent {
  displayedColumns: string[] = ['name', 'game', 'date', 'type', 'organizer', 'actions'];
  tournaments : any[] = []
  dataSource = new MatTableDataSource(this.tournaments);
  search : string = '';

  constructor(private _announcer: LiveAnnouncer,
    private tournamentService: TournamentService,
    private router: Router) {}

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // initialisation de la table
  ngOnInit(): void {
    this.tournamentService.getFollowedTournaments().subscribe((data: any) => {
      console.log(data);
      this.tournaments = data;
      this.dataSource = new MatTableDataSource(this.tournaments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // tri de la table
  onSearchChange() {
    this.tournamentService.searchFollowedTournaments(this.search).subscribe((data) => {
      this.tournaments = data;
      this.dataSource = new MatTableDataSource(this.tournaments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // voir le profil d'un tournoi
  look(element: any) {
    this.router.navigate(['/tournament/profile/' + element._id]);
  }
}
