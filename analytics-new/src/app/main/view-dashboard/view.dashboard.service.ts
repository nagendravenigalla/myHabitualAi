import {Injectable} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';
import {CommonHelper} from '../../common/common.helper';
import {LineChartInterface} from '../../common/line.chart.interface';
import {DashboardConfig} from "./dashboard.config";


@Injectable()
export class ViewDashboardService {
    dashboardConfig: DashboardConfig = new DashboardConfig();
    private dashboardBaseUrl: string = '';
    private deleteBaseUrl: string = '';
    commonHelper: CommonHelper;
    private graphQlUrl: string;

    constructor(private http: HttpClient) {
        this.commonHelper = new CommonHelper();
        this.dashboardBaseUrl = this.dashboardConfig.getUrl('segment');
        this.deleteBaseUrl = this.dashboardConfig.getUrl('segment');
        this.graphQlUrl = this.dashboardConfig.getGraphQl();
    }

    getAllDashboards(obj): Observable<any> {
        const url = this.dashboardBaseUrl + '?sort='+obj.sort+'&limit='+obj.limit+
            '&order='+obj.order+'&offset='+obj.offset+'&count='+obj.count;
        return this.http.get(url)
            .pipe(
                catchError(this.commonHelper.handleError('getAllDashboards', []))
            );
    }

    deleteDashboard(id): Observable<any> {
        return this.http.delete(this.dashboardBaseUrl + '/' + id)
            .pipe(
                catchError(this.commonHelper.handleError('delete dashboard', []))
            );
    }

    getChartDataFromGraphQl(data): Observable<any> {

        return this.http.post(this.graphQlUrl, data)
            .pipe(
                catchError(this.commonHelper.handleError('get chart data using graph ql', {status: 500}))
            );
    }

    getChart(data, metric) {
            return this.lineChartGql(data, metric);
    }

    lineChartGql(data, userType){
       
        const newData: Array<LineChartInterface> = [];
        if(data) {
            data.forEach(eachData => {
                eachData.analytics.response.forEach(eachAnalysis => {
                    const obj: LineChartInterface = {'name': eachData.event_name, data: []};
                    if(eachAnalysis.response_key.field_name !== null && eachAnalysis.response_key.attr_value !== null) {
                        obj.name = `${eachData.series_title}(${eachAnalysis.response_key.field_name} - ${eachAnalysis.response_key.attr_value})`;
                    }else{
                        obj.name = `${eachData.series_title}`;
                    }
                    eachAnalysis.response_values.forEach(eachRes => {
                        const array = [];
                        const timestamp = eachRes.window_id * 1000;
                        const count = eachRes[userType];
                       
                        array.push(timestamp);
                        array.push(count);
                        obj.data.push(array);
                    });
                    newData.push(obj)
                });
            });
        }
        return newData;
    }
}
