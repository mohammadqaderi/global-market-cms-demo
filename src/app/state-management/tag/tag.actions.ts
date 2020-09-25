import {TagModel} from '../../models/Tag/tag.model';
import {TagDto} from '../../commons/public-dto/tag.dto';

export interface TagStateModel {
  tags: TagModel[];
}

export namespace TagActions {
  export class FetchAllTags {
    static readonly type = '[Tag] Fetch All Tags';

    constructor() {
    }
  }

  export class FetchTagById {
    static readonly type = '[Tag] Fetch Tag By Id';

    constructor(public id: number) {
    }
  }

  export class AddNewTag {
    static readonly type = '[Tag] Add New Tag';

    constructor(public tagDto: TagDto) {
    }
  }
  export class ClearTags {
    static readonly type = '[Tag] Clear Tags';

    constructor() {
    }
  }

  export class UpdateTag {
    static readonly type = '[Tag] Update Tag';

    constructor(public id: number, public tagDto: TagDto) {
    }
  }

  export class DeleteTag {
    static readonly type = '[Tag] Delete Tag';

    constructor(public id: number) {
    }
  }
}
