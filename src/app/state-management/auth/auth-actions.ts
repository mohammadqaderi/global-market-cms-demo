import {UserModel} from '../../models/Auth/user.model';
import {AuthCredentialsDto} from '../../commons/public-dto/auth-credentials.dto';

export interface AuthStateModel {
  token: string;
  admin: UserModel;
}

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: AuthCredentialsDto) {
  }
}

export class UpdateToken {
  static readonly type = '[Auth] Update Token';

  constructor(public token: string) {
  }
}

export class RegisterAdmin {
  static readonly type = '[Auth] Register Admin';

  constructor(public payload: any) {
  }
}


export class Logout {
  static readonly type = '[Auth] Logout';
}
