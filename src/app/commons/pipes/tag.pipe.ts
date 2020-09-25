import {Pipe, PipeTransform} from '@angular/core';
import {TagModel} from '../../models/Tag/tag.model';

@Pipe({
  name: 'tagsFilter'
})
export class TagPipe implements PipeTransform {

  transform(tags: TagModel[], searchTerm: string): TagModel[] {
    if (!tags || !searchTerm) {
      return tags;
    }
    return tags.filter(category =>
      category.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
