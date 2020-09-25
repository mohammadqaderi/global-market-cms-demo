import {NgModule} from '@angular/core';
import {CategoryPipe} from './category.pipe';
import {TagPipe} from './tag.pipe';


@NgModule({
  declarations: [CategoryPipe, TagPipe],
  exports: [CategoryPipe, TagPipe]
})
export class PipesModule {

}
