import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TagModel} from '../../models/Tag/tag.model';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';
import {TagDto} from '../../commons/public-dto/tag.dto';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private _http: HttpClient) {
  }

  getAllTags(): Observable<TagModel[]> {
    return this._http.get<TagModel[]>(ApiEndpoints.TagEndpoints.rootTags);
  }

  getTagById(id: number): Observable<TagModel> {
    return this._http.get<TagModel>(`${ApiEndpoints.TagEndpoints.rootTags}/${id}`);
  }

  newTag(tagDto: TagDto): Observable<TagModel> {
    return this._http.post<TagModel>(`${ApiEndpoints.TagEndpoints.rootTags}/new`, tagDto);
  }

  updateTag(id: number, tagDto: TagDto): Observable<TagModel> {
    return this._http.put<TagModel>(`${ApiEndpoints.TagEndpoints.rootTags}/${id}/update`, tagDto);
  }

  deleteTag(id: number): Observable<void> {
    return this._http.delete<void>(`${ApiEndpoints.TagEndpoints.rootTags}/${id}/delete`);
  }
}
