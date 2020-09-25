import {ProfileModel} from '../../models/Profile/profile.model';
import {CreateProfileDto} from '../../commons/public-dto/create-profile.dto';

export interface ProfileStateModel {
  profile: ProfileModel;
}

export namespace ProfileActions {
  export class CreateAdminProfile {
    static readonly type = '[Profile] Create Admin Profile';

    constructor(public createProfileDto: CreateProfileDto) {
    }
  }

  export class FetchUserProfile {
    static readonly type = '[Profile] Fetch User Profile';

    constructor() {
    }
  }

  export class EditProfile {
    static readonly type = '[Profile] Edit Profile';

    constructor(public updateProfileDto: CreateProfileDto) {
    }
  }

  export class SetProfileImage {
    static readonly type = '[Profile] Set Profile Image';

    constructor(public imageForm: any, public subFolder: string) {
    }
  }

  export class ChangeProfileImage {
    static readonly type = '[Profile] Change Profile Image';

    constructor(public imageForm: any, public subFolder: string) {
    }
  }

  export class DeleteProfileImage {
    static readonly type = '[Profile] Delete Profile Image';

    constructor() {
    }
  }

  export class ClearProfileData {
    static readonly type = '[Profile] Clear Profile Data';
    constructor() {
    }
  }
}
