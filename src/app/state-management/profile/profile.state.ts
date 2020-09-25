import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ProfileActions, ProfileStateModel} from './profile.actions';
import {Injectable} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {tap} from 'rxjs/operators';
import {ProfileModel} from '../../models/Profile/profile.model';
import FetchUserProfile = ProfileActions.FetchUserProfile;
import EditProfile = ProfileActions.EditProfile;
import SetProfileImage = ProfileActions.SetProfileImage;
import ChangeProfileImage = ProfileActions.ChangeProfileImage;
import DeleteProfileImage = ProfileActions.DeleteProfileImage;
import ClearProfileData = ProfileActions.ClearProfileData;
import CreateAdminProfile = ProfileActions.CreateAdminProfile;


@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null
  }
})
@Injectable()
export class ProfileState {
  constructor(private profileService: ProfileService) {
  }

  @Selector()
  static Profile(state: ProfileStateModel) {
    return state.profile;
  }

  @Action(CreateAdminProfile)
  createAdminProfile(ctx: StateContext<ProfileStateModel>, action: CreateAdminProfile) {
    return this.profileService.createAdminProfile(action.createProfileDto).pipe(
      tap((profile: ProfileModel) => {
        ctx.setState({
          profile
        });
      })
    );
  }

  @Action(ClearProfileData)
  clearProfileData(ctx: StateContext<ProfileStateModel>, action: ClearProfileData) {
    ctx.setState({
      profile: null
    });
  }

  @Action(EditProfile)
  editProfile(ctx: StateContext<ProfileStateModel>, action: EditProfile) {
    return this.profileService.editAdminProfile(action.updateProfileDto).pipe(
      tap((profile: ProfileModel) => {
        ctx.patchState({
          profile
        });
      })
    );
  }

  @Action(FetchUserProfile)
  fetchAdminProfile(ctx: StateContext<ProfileStateModel>, action: FetchUserProfile) {
    return this.profileService.getAdminProfile().pipe(
      tap((profile: ProfileModel) => {
        ctx.setState({
          profile
        });
      })
    );
  }

  @Action(SetProfileImage)
  setProfileImage(ctx: StateContext<ProfileStateModel>, action: SetProfileImage) {
    return this.profileService.setProfileImage(action.imageForm, action.subFolder).pipe(
      tap((profile: ProfileModel) => {
        ctx.patchState({
          profile
        });
      })
    );
  }

  @Action(ChangeProfileImage)
  changeProfileImage(ctx: StateContext<ProfileStateModel>, action: ChangeProfileImage) {
    return this.profileService.changeProfileImage(action.imageForm, action.subFolder).pipe(
      tap((profile: ProfileModel) => {
        ctx.patchState({
          profile
        });
      })
    );
  }

  @Action(DeleteProfileImage)
  deleteProfileImage(ctx: StateContext<ProfileStateModel>, action: DeleteProfileImage) {
    return this.profileService.deleteProfileImage().pipe(
      tap((profile: ProfileModel) => {
        ctx.patchState({
          profile
        });
      })
    );
  }

}
