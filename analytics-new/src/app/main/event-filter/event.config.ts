import { BaseConfig} from "../../common/base.config";

export class EventConfig{
    baseConfig: BaseConfig = new BaseConfig();
    config = {

        'apis': {
            'info': 'meta/',
            'values': 'distcol',
            'groupables': 'columns/groupables',
            'attributes': 'attributes'
        }


    };

    getUrl(value): string{
        return this.baseConfig.getBaseChartsUrl() + this.config.apis[value];
    }
}


