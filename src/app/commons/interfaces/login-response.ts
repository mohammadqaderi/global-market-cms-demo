import {UserModel} from '../../models/Auth/user.model';

export class LoginResponse {
  admin: UserModel;
  token: string;
}
