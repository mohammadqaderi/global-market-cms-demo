import {Action, Selector, State, StateContext} from '@ngxs/store';
import {TagActions, TagStateModel} from './tag.actions';
import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag/tag.service';
import FetchAllTags = TagActions.FetchAllTags;
import {tap} from 'rxjs/operators';
import {TagModel} from '../../models/Tag/tag.model';
import AddNewTag = TagActions.AddNewTag;
import {append, patch, removeItem, updateItem} from '@ngxs/store/operators';
import UpdateTag = TagActions.UpdateTag;
import DeleteTag = TagActions.DeleteTag;
import ClearTags = TagActions.ClearTags;


@State<TagStateModel>({
  name: 'tags',
  defaults: {
    tags: null
  }
})
@Injectable()
export class TagState {
  constructor(private tagService: TagService) {
  }

  @Selector()
  static Tags(state: TagStateModel) {
    return state.tags;
  }

  @Action(FetchAllTags)
  fetchAllTags(ctx: StateContext<TagStateModel>, action: FetchAllTags) {
    return this.tagService.getAllTags().pipe(
      tap((tags: TagModel[]) => {
        ctx.setState({
          tags
        });
      })
    );
  }

  @Action(AddNewTag)
  addNewTag(ctx: StateContext<TagStateModel>, action: AddNewTag) {
    return this.tagService.newTag(action.tagDto).pipe(
      tap((tag: TagModel) => {
        ctx.setState(patch({
          tags: append<TagModel>([tag])
        }));
      })
    );
  }

  @Action(UpdateTag)
  updateTag(ctx: StateContext<TagStateModel>, action: UpdateTag) {
    return this.tagService.updateTag(action.id, action.tagDto).pipe(
      tap((updatedTag: TagModel) => {
        ctx.setState(patch({
          tags: updateItem<TagModel>(tag => tag.id === action.id, updatedTag)
        }));
      })
    );
  }

  @Action(ClearTags)
  clearTags(ctx: StateContext<TagStateModel>, action: ClearTags) {
    ctx.setState({
      tags: null
    });
  }

  @Action(DeleteTag)
  deleteTag(ctx: StateContext<TagStateModel>, action: DeleteTag) {
    return this.tagService.deleteTag(action.id).pipe(
      tap(() => {
        ctx.setState(patch({
          tags: removeItem<TagModel>(tag => tag.id === action.id)
        }));
      })
    );
  }

}
