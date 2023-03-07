import { Component, Input } from "@angular/core";
import { TournamentModel } from "@data/schemas/tournament.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TournamentService } from "@data/services/tournament.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-of-tournaments',
  templateUrl: './list-of-tournaments.component.html',
  styleUrls: ['./list-of-tournaments.component.scss']
})
export class ListOfTournamentsComponent {
  tournaments!: TournamentModel[];

  @Input() filter: string = "";

  searchForm!: FormGroup;

  constructor(private tournamentService: TournamentService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.filter == "") {
      this.tournamentService.getTournaments().subscribe({
        next: (tournaments) => {
          this.tournaments = tournaments;
        }
      });
    } else {
      this.tournamentService.getTournamentsFrom(this.filter).subscribe({
        next: (tournaments) => {
          this.tournaments = tournaments;
        }
      });
    }

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
