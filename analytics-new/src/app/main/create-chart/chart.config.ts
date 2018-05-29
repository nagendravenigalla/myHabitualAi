import { BaseConfig} from "../../common/base.config";

export class ChartConfig{
    baseConfig: BaseConfig = new BaseConfig();
    config = {

        'apis': {
            'data': 'data',
            'export': 'exportAsCSV',
            'segment': 'segments'
        }


    };

    getUrl(value): string{
        return this.baseConfig.getBaseChartsUrl() + this.config.apis[value];
    }

    getDashBoardUrl(value): string{
        return this.baseConfig.getBaseDashboardUrl()+this.config.apis[value];
    }

    getHabitualUrl(value): string{
        return this.baseConfig.getBaseHabitualUrl() + this.config.apis[value];
    }

    getGraphQl(): string{
        return this.baseConfig.getGraphQl();
    }
}


