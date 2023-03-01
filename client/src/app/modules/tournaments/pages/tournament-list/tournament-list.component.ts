import { Component } from '@angular/core';
import { TournamentService } from "@data/services/tournament.service";
import { TournamentModel } from "@data/schemas/tournament.model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent {
  tournaments!: TournamentModel[];

  searchForm!: FormGroup;

  constructor(private tournamentService: TournamentService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments;
      }
    });

    this.searchForm = this.formBuilder.group({
      search: [""],
    });
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  searchData() {}

  sortData(sort: string) {}

  filterData(filter: string) {}

  orderData(order: string) {}
}
