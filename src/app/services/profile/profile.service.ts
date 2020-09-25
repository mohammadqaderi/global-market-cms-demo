import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileModel} from '../../models/Profile/profile.model';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {CreateProfileDto} from '../../commons/public-dto/create-profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) {
  }

  getAdminProfile(): Observable<ProfileModel> {
    return this._http.get<ProfileModel>(`${ApiEndpoints.ProfileEndpoints.rootProfile}/user-profile`);
  }

  createAdminProfile(createProfileDto: CreateProfileDto): Observable<ProfileModel> {
    return this._http.post<ProfileModel>
    (`${ApiEndpoints.ProfileEndpoints.rootProfile}/create-profile`, createProfileDto);
  }

  editAdminProfile(updateProfileDto: CreateProfileDto): Observable<ProfileModel> {
    return this._http.put<ProfileModel>
    (`${ApiEndpoints.ProfileEndpoints.rootProfile}/user-profile/edit-profile`, updateProfileDto);
  }

  setProfileImage(imageForm: any, subFolder: string, folderName = 'users-images'): Observable<ProfileModel> {
    const url = `${ApiEndpoints.ProfileEndpoints.rootProfile}/user-profile/set-profile-image/${folderName}/${subFolder}`;
    return this._http.post<ProfileModel>(url, imageForm);
  }

  changeProfileImage(imageForm: any, subFolder: string, folderName = 'users-images'): Observable<ProfileModel> {
    const url = `${ApiEndpoints.ProfileEndpoints.rootProfile}/user-profile/change-profile-image/${folderName}/${subFolder}`;
    return this._http.patch<ProfileModel>(url, imageForm);
  }

  deleteProfileImage() {
    return this._http.delete<ProfileModel>
    (`${ApiEndpoints.ProfileEndpoints.rootProfile}/user-profile/delete-profile-image`);
  }

}
