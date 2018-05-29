import { BaseConfig} from "../../common/base.config";

export class TaxonomyConfig{
    baseConfig: BaseConfig = new BaseConfig();
    config = {

        'apis': {
            'uncategorised': 'uncategorised',
            'attributes': 'attributes',
            'categories': 'categories',
            'recommendedCategories': 'recommendedCategories',
            'categoriesEventList': 'categoriesEventList'
        }


    };

    getUrl(value): string{
        return this.baseConfig.getBaseChartsUrl() + this.config.apis[value];
    }
}




