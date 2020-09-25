import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {UserActions} from '../../../state-management/user/user.actions';
import {UserRole} from '../../../commons/enums/user-role.enum';
import FetchSystemUsers = UserActions.FetchSystemUsers;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'isEmailVerified', 'roles', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public helperService: HelperService,
              public gdService: GlobalDataService,
              public store: Store) {
    if (!gdService.Users) {
      this.helperService.showSpinner('Loading Users...');
      this.store.dispatch(new FetchSystemUsers()).subscribe(() => {
        this.helperService.hideSpinner();
        this.refreshUsers();
      });
    } else {
      this.refreshUsers();
    }
  }

  isSuperAdmin(claims: UserRole[]) {
    return claims.some(c => c === UserRole.SUPER_ADMIN);
  }

  ngOnInit(): void {
    this.helperService.userDataSource.paginator = this.paginator;
    this.helperService.userDataSource.sort = this.sort;
  }


  refreshUsers() {
    this.helperService.userDataSource.data = this.Users;
  }


  get Users() {
    return this.gdService.Users;
  }

  get User() {
    return this.gdService.User;
  }
}
