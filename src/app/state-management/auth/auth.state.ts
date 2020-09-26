import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {AuthStateModel, Login, Logout, RegisterAdmin, UpdateToken} from './auth-actions';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';
import {LoginResponse} from '../../commons/interfaces/login-response';
import {UserModel} from '../../models/Auth/user.model';
import {UserActions} from '../user/user.actions';
import PushNewAdmin = UserActions.PushNewAdmin;
import {UserState} from '../user/user.state';
import FetchSystemUsers = UserActions.FetchSystemUsers;


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    admin: null,
  }
})

@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static Token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static Username(state: AuthStateModel): string | null {
    return state.admin.username;
  }

  @Selector()
  static Admin(state: AuthStateModel): UserModel | null {
    return state.admin;
  }

  constructor(private authService: AuthService, private store: Store) {
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.loginAdmin(action.payload).pipe(
      tap((result: LoginResponse) => {
        if (result) {
          ctx.setState({
            admin: result.admin,
            token: result.token
          });
        }
      })
    );
  }

  @Action(RegisterAdmin)
  registerAdmin(ctx: StateContext<AuthStateModel>, action: RegisterAdmin) {
    return this.authService.registerAdmin(action.payload).pipe(
      tap((result: LoginResponse) => {
        if (result) {
          const {id, username, emailVerified, email} = result.admin;
          const admin = new UserModel(id, username, emailVerified, email);
          ctx.setState({
            admin: result.admin,
            token: result.token
          });
          if (!this.store.selectSnapshot(UserState.Users)) {
            this.store.dispatch(new FetchSystemUsers()).subscribe(() => {
              this.store.dispatch(new PushNewAdmin(admin));
            });
          }
        }
      })
    );
  }

  @Action(UpdateToken)
  updateToken(ctx: StateContext<AuthStateModel>, action: UpdateToken) {
    ctx.patchState({
      token: action.token
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, action: Logout) {
    ctx.setState({
      token: null,
      admin: null,
    });
  }
}
