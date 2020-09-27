import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {UserModel} from '../../models/Auth/user.model';
import {Observable} from 'rxjs';
import {UserRole} from '../../commons/enums/user-role.enum';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private _http: HttpClient) {
  }

  getSystemUsers(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(ApiEndpoints.AuthEndpoints.getSystemUsers);
  }

  editUserRoles(userId: number, editRolesDto: { roles: UserRole[] }): Observable<{ processCompleted: boolean }> {
    return this._http.put<{ processCompleted: boolean }>(`${ApiEndpoints.AuthEndpoints.editUserRoles}/${userId}`, editRolesDto);
  }


}
