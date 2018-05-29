import { BaseConfig} from "../../common/base.config";

export class HabitualConfig{
  baseConfig: BaseConfig = new BaseConfig();
  config = {
      'onboard': {
        'tasks': 'tasks',
        'userBases': 'userBases',
        'exportAsCSV': 'tasks/csv/'
      }


  };

  getUrl(value): string{
    return this.baseConfig.getBaseHabitualUrl() + this.config.onboard[value];
  }
}


