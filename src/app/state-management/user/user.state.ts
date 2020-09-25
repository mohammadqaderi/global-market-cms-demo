import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UserActions, UserStateModel} from './user.actions';
import {Injectable} from '@angular/core';
import ClearUsersFromStorage = UserActions.ClearUsersFromStorage;
import FetchSystemUsers = UserActions.FetchSystemUsers;
import {UserService} from '../../services/user.service';
import {tap} from 'rxjs/operators';
import {UserModel} from '../../models/Auth/user.model';
import EditUserRoles = UserActions.EditUserRoles;
import {patch, updateItem} from '@ngxs/store/operators';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: null
  }
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {
  }

  @Selector()
  static Users(state: UserStateModel) {
    return state.users;
  }

  @Action(ClearUsersFromStorage)
  clearUsersFromStorage(ctx: StateContext<UserStateModel>, action: ClearUsersFromStorage) {
    ctx.setState({
      users: null
    });
  }

  @Action(EditUserRoles)
  editUserRoles(ctx: StateContext<UserStateModel>, action: EditUserRoles) {
    const {user, editRolesDto} = action;
    return this.userService.editUserRoles(user.id, editRolesDto).pipe(
      tap((data: { processCompleted: boolean }) => {
        const {processCompleted} = data;
        if (processCompleted) {
          const userToUpdate = Object.assign({}, user);
          userToUpdate.claims = editRolesDto.roles;
          ctx.setState(patch(
            {
              users: updateItem<UserModel>(u => u.id === user.id, userToUpdate)
            }
          ));
        }
      })
    );
  }

  @Action(FetchSystemUsers)
  fetchSystemUsers(ctx: StateContext<UserStateModel>, action: FetchSystemUsers) {
    return this.userService.getSystemUsers().pipe(
      tap((users: UserModel[]) => {
        ctx.setState({
          users
        });
      })
    );
  }
}
