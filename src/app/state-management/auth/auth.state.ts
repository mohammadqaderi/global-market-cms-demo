import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {AuthStateModel, Login, Logout, RegisterAdmin, UpdateToken} from './auth-actions';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LoginResponse} from '../../commons/interfaces/login-response';
import {UserModel} from '../../models/Auth/user.model';


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

  constructor(private authService: AuthService, private router: Router) {
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
          ctx.setState({
            admin: result.admin,
            token: result.token
          });
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
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      admin: null,
    });
  }
}
