import {UserModel} from '../../models/Auth/user.model';
import {UserRole} from '../../commons/enums/user-role.enum';

export interface UserStateModel {
  users: UserModel[];
}

export namespace UserActions {

  export class FetchSystemUsers {
    static readonly type = '[User] Fetch System Users';

    constructor() {
    }
  }

  export class EditUserRoles {
    static readonly type = '[User] Edit User Roles';
    constructor(public user: UserModel, public editRolesDto: { roles: UserRole[] }) {
    }
  }

  export class ClearUsersFromStorage {
    static readonly type = '[User] Clear Users From Storage';

    constructor() {
    }
  }
}
