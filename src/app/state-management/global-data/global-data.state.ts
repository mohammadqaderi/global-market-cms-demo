import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ClearGlobalData, FetchGlobalData, GlobalDataStateModel} from './global-data.actions';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {tap} from 'rxjs/operators';
import {GlobalDataDto} from '../../commons/public-dto/global-data.dto';


@State<GlobalDataStateModel>({
  name: 'globalData',
  defaults: {
    globalData: null
  }
})
@Injectable()
export class GlobalDataState {
  constructor(private authService: AuthService) {
  }

  @Selector()
  static GlobalData(state: GlobalDataStateModel) {
    return state.globalData;
  }

  @Action(FetchGlobalData)
  fetchGlobalData(ctx: StateContext<GlobalDataStateModel>, action: FetchGlobalData) {
    return this.authService.getGlobalData().pipe(
      tap((globalData: GlobalDataDto) => {
        if (globalData) {
          ctx.setState({
            globalData
          });
        }
      })
    );
  }

  @Action(ClearGlobalData)
  clearGlobalData(ctx: StateContext<GlobalDataStateModel>, action: ClearGlobalData) {
    ctx.setState({
      globalData: null
    });
  }
}
