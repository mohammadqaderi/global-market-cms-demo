import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserRole} from '../../../commons/enums/user-role.enum';
import {UserModel} from '../../../models/Auth/user.model';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {MatChipInputEvent} from '@angular/material/chips';
import {UserActions} from '../../../state-management/user/user.actions';
import EditUserRoles = UserActions.EditUserRoles;

@Component({
  selector: 'app-edit-users-roles',
  templateUrl: './edit-users-roles.component.html',
  styleUrls: ['./edit-users-roles.component.css']
})
export class EditUsersRolesComponent implements OnInit {
  availableRoles = [UserRole.WEAK_ADMIN, UserRole.SUPER_ADMIN];
  roles = [];
  @Input() user: UserModel;
  @Input() helperService: HelperService;
  @Input() store: Store;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.roles = [].concat(this.user.claims);
  }

  pushRole(role) {
    this.roles.push(role);
    this.availableRoles.splice(this.availableRoles.indexOf(role), 1);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.roles.push(value.trim() as any);
    }
    if (input) {
      input.value = '';
    }
  }

  editUserRoles() {
    this.helperService.showSpinner(`Updating ${this.user.username} Roles...`);
    this.store.dispatch(new EditUserRoles(this.user, {roles: this.roles})).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.hideDialog();
      this.helperService.openSnackbar('User Claims updated successfully', 'okay');
      this.change.emit();
    });
  }

  remove(role: UserRole): void {
    if (role === UserRole.USER) {
      return;
    }
    const index = this.roles.indexOf(role);
    if (index >= 0) {
      this.roles.splice(index, 1);
      this.availableRoles.push(role);
    }
  }

}
