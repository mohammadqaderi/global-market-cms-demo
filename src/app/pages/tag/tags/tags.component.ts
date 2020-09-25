import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {TagActions} from '../../../state-management/tag/tag.actions';
import FetchAllTags = TagActions.FetchAllTags;
import {TagDto} from '../../../commons/public-dto/tag.dto';
import AddNewTag = TagActions.AddNewTag;
import UpdateTag = TagActions.UpdateTag;
import DeleteTag = TagActions.DeleteTag;

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;
  searchTerm: string;
  displayedRows = 5;
  createTagDto = new TagDto();
  updateTagDto = new TagDto();

  constructor(public helperService: HelperService,
              public gdService: GlobalDataService,
              public store: Store) {

  }

  selectDisplayedRows() {
    return this.Tags.slice(0, this.displayedRows);
  }

  ngOnInit(): void {
    if (!this.gdService.Tags) {
      this.helperService.showSpinner('Loading Tags...');
      this.store.dispatch(new FetchAllTags()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
  }

  prepareUpdateTag(tagName: string) {
    this.updateTagDto.name = tagName;
  }

  updateTag(id: number) {
    this.helperService.showSpinner('Adding Tag...');
    this.store.dispatch(new UpdateTag(id, this.updateTagDto)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.hideDialog();
      this.helperService.openSnackbar('Tag updated successfully', 'okay');
    });
  }

  deleteTag(id: number) {
    this.helperService.showSpinner('Deleting Tag...');
    this.store.dispatch(new DeleteTag(id)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Tag deleted successfully', 'okay');
    });
  }

  addNewTag() {
    this.helperService.showSpinner('Adding Tag...');
    this.store.dispatch(new AddNewTag(this.createTagDto)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.hideDialog();
      this.clearName();
      this.helperService.openSnackbar('Tag added successfully', 'okay');
    });
  }

  clearName() {
    this.createTagDto.name = null;
  }

  get Tags() {
    return this.gdService.Tags;
  }

}
