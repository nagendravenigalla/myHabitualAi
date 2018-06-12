import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonHelper} from "../../../common/common.helper";

@Injectable()
export class DateFilterService {

    commonHelper: CommonHelper;

    constructor(private http: HttpClient) {
        this.commonHelper = new CommonHelper();
    }

    getStartTime(filterData) {
        let time = 0;
        if (filterData.granularity === 'daily') {
            time = this.getDailyEpochTime('start', filterData.timeWindow);
        } else if (filterData.granularity === 'monthly') {
            time = this.getMonthlyEpochTime('start', filterData.timeWindow);
        } else {
            time = this.getWeeklyEpochTime('start', filterData.timeWindow);
        }

        return time;
    }

    getEndTime(filterData) {
        let time = 0;
        if (filterData.granularity === 'daily') {
            time = this.getDailyEpochTime('end', filterData.timeWindow);
        } else if (filterData.granularity === 'monthly') {
            time = this.getMonthlyEpochTime('end', filterData.timeWindow);
        } else {
            time = this.getWeeklyEpochTime('end', filterData.timeWindow);
        }

        return time;
    }

    /**
     * Gets monthly epoch time window
     *
     * @param time type - start or end
     * @param timeWindow - time window
     */
    private getMonthlyEpochTime(timeType, timeWindow) {
        let epochTime = 0;
        if (timeType === 'start') {
            const date = new Date();
            date.setDate(0);
            date.setMonth(date.getMonth() - timeWindow);
            epochTime = this.getUTCTime(date);
        } else {
            const date = new Date();
            date.setDate(0);
            epochTime = this.getUTCTime(date);
        }
        return epochTime;

    }

    /**
     * Gets weekly epoch time window
     *
     * @param time type - start or end
     * @param timeWindow - time window
     */
    private getWeeklyEpochTime(timeType, timeWindow) {
        let epochTime = 0;
        if (timeType === 'start') {
            const date = new Date();
            const days = date.getDay();
            const modDate = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
            const modifiedDate = new Date(modDate.getTime() - (timeWindow * 7 * 24 * 60 * 60 * 1000));
            epochTime = this.getUTCTime(modifiedDate);
        } else {
            const d = new Date();
            const days = d.getDay();
            const modifiedDate = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000));
            epochTime = this.getUTCTime(modifiedDate);
        }
        return epochTime;
    }

    /**
     * Gets daily epoch time window
     *
     * @param time type - start or end
     * @param timeWindow - time window
     */
    private getDailyEpochTime(timeType, timeWindow) {
        let epochTime = 0;
        if (timeType === 'start') {
            const date = new Date();
            const modifiedDate = new Date(date.getTime() - (timeWindow * 24 * 60 * 60 * 1000));
            epochTime = this.getUTCTime(modifiedDate);
        } else {
            const date = new Date();
            epochTime = this.getUTCTime(date);
        }
        return epochTime;
    }

    /**
     * Gets epoct time from date
     *
     * @param date type - date type

     */
    private getUTCTime(date) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0) / 1000;
    }


}






