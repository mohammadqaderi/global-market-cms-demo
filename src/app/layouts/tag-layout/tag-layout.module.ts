import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagsComponent} from '../../pages/tag/tags/tags.component';
import {RouterModule} from '@angular/router';
import {TagsLayoutRoutes} from './tag-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {PipesModule} from '../../commons/pipes/pipes.module';


@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(TagsLayoutRoutes),
    PipesModule
  ]
})
export class TagLayoutModule {
}
