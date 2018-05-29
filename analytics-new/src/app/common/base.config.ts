import * as data from '../../assets/base.config.json';

export class BaseConfig{

    env = (<any>data).env;

    config = (<any>data).configObj;

    getBaseHabitualUrl(): string{
        return 'http://' + this.config[this.env].baseUrl + ':' + this.config[this.env].habitualPort + '/'+this.config[this.env].base+'habitual-engine/';
    }

    getBaseDashboardUrl(): string{
        return 'http://' + this.config[this.env].baseUrl + ':' + this.config[this.env].dashboardPort + '/';
    }

    getBaseChartsUrl(): string{
        return 'http://' + this.config[this.env].baseUrl + ':' + this.config[this.env].chartsPort +'/'+this.config[this.env].base+'dashboard/';
    }

    getDataSourceUrl(): string{
        return this.config[this.env].dataSourceUrl;
    }

    logout(): string{
        return this.config[this.env].kongLogout;
    }

    goToProfile(): string{
        return this.config[this.env].goProfile;
    }

    getGraphQl(): string{
        return this.config[this.env].graphQlUrl;
    }
}


