import { BaseConfig} from "../../common/base.config";

export class DashboardConfig{
    baseConfig: BaseConfig = new BaseConfig();
    config = {

        'apis': {
            'segment': 'segments'
        }


    };

    getUrl(value): string{
        return this.baseConfig.getBaseChartsUrl() + this.config.apis[value];
    }

    getGraphQl(): string{
        return this.baseConfig.getGraphQl();
    }
}


