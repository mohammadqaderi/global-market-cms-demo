import {GlobalDataDto} from '../../commons/public-dto/global-data.dto';

export interface GlobalDataStateModel {
  globalData: GlobalDataDto;
}

export class FetchGlobalData {
  static readonly type = '[Global Data] Fetch Global Data';

  constructor() {
  }
}

export class ClearGlobalData {
  static readonly type = '[Global Data] Clear Global Data';

  constructor() {
  }
}
