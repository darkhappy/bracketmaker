import { Component } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserService } from '@data/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-followed-users',
  templateUrl: './followed-users.component.html',
  styleUrls: ['./followed-users.component.scss']
})
export class FollowedUsersComponent {
  displayedColumns: string[] = ['username', 'subscribers', 'tournaments', 'actions'];
  users : any[] = []
  dataSource = new MatTableDataSource(this.users);
  search : string = '';

  constructor(private _announcer: LiveAnnouncer,
    private userService: UserService) {}

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.userService.getFollowedUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onSearchChange() {
    
  }

  look(element: any) {
  }
}
