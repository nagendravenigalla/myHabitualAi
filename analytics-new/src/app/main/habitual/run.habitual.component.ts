// chart.component.ts
import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AddRunComponent} from './add.run.component';
import {RunHabitualService} from './run.habitual.service';
import * as _ from 'lodash';
import {ISubscription} from "rxjs/Subscription";
import {DeleteConfirmation} from '../delete-confirmation/delete.confirmation';


@Component({
    selector: 'fuse-run-habitual',
    templateUrl: 'run.habitual.component.html',
    styleUrls: ['create.dialog.component.scss']
})
export class RunHabitualComponent implements OnInit, OnDestroy {
    id: any;
    indiRun = {runName: '', baseName: '', date: new Date()};
    runData: any;
    runArray: Array<any> = [];
    subscription: ISubscription;
    habitualSubscription: ISubscription;
    page: number = 1;
    start: number = 1;
    end: number = 10;
    totalCount: number = 0;
    loaded: boolean = true;
    paginateObj = {sort: 'serial_no', limit: 10, order: 'desc', offset: 0};

    constructor(public dialog: MatDialog, public router: Router, private habitualService: RunHabitualService) {

    }

    openDialog(data = null): void {
        this.indiRun = {runName: '', baseName: '', date: new Date()};
        if (!data) {
            data = _.cloneDeep(this.indiRun);
        }
        const dialogRef = this.dialog.open(AddRunComponent, {
            width: '400px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.runName && result.baseName && result.date) {
                const obj = {
                    schedule_name: result.runName,
                    customerbase: result.baseName,
                    executed_at: Math.round(result.date.getTime() / 1000)
                };
                this.habitualService.addRun(obj).subscribe(response => {
                    this.getData('samepage');
                });
            }
        });
    }

    openDeleteDialog(event): void {
        const dialogRef = this.dialog.open(DeleteConfirmation, {
            width: '600px',
            data: event
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const userObj = {'serialId': ''};
                userObj.serialId = result.serial_no.toString();
                this.habitualService.deleteRun(userObj).subscribe(response => {
                    this.getData('samepage');
                });
            }
        });
    }

    /**
     * Delete run.
     *
     * @param   id  runId to pass to deleteRun api
     * @return  none
     */
    deleteRun(run) {
        this.openDeleteDialog(run);
    }

    copyRun(data) {
        const newObj = {runName: '', baseName: '', date: new Date()};
        newObj.runName = data.schedule_name;
        newObj.baseName = data.segment_id;
        this.openDialog(newObj);
    }

    refreshRun(run) {
        const obj = {
            runname: run.schedule_name,
            customerbase: run.segment_id,
            starttime: Math.round(new Date().getTime() / 1000),
            serial_no: run.serial_no
        };

        this.habitualService.addRun(obj).subscribe(response => {
            this.getData();
        });
    }

    pollData() {
        this.id = setInterval(() => {
            this.getData();
        }, 10000);
    }

    clearPollInterval() {
        clearInterval(this.id);
    }

    showOnSuccess(run) {
        return run.status.match('success') !== null;
    }

    getStart() {
        const val = (this.page - 1) * 10 + 1;
        return val;
    }

    getEnd() {
        if (this.runArray.length < 10) {
            return (this.page - 1) * 10 + this.runArray.length;
        } else {
            return this.page * 10;

        }
    }

    downloadRun(run) {
        run.isDownloading = true;
        try {
            this.subscription = this.habitualService.exportAsCSV(run).subscribe(response => {
                let parsedResponse = response.text();
                let blob = new Blob([parsedResponse], {type: 'text/csv'});
                let url = window.URL.createObjectURL(blob);

                if (navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, run.runname);
                } else {
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = run.schedule_name + '.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
                window.URL.revokeObjectURL(url);
                run.isDownloading = false;
            });
        } catch (ex) {
            run.isDownloading = false;
        } finally {
            /*run.isDownloading = false;*/
        }
    }

    goToNext() {
        if(this.end*this.page<this.totalCount) {
            this.getData('add');
        }
    }

    goToPrevious() {
        if (this.page > 1) {
            this.getData();
        }
    }

    viewChart(run){
        this.router.navigate(['campaigns/comparison', run.schedule_id]);
    }

    getData(operator = null) {
        this.loaded = false;
        if (operator && operator === 'add') {
            this.paginateObj.offset++;
        } else if (operator === 'samepage') {

        } else {
            this.paginateObj.offset--;
        }
        this.page = this.paginateObj.offset;
        this.start = this.getStart();
        this.end = this.getEnd();
        this.habitualSubscription = this.habitualService.getRunData(this.paginateObj).subscribe(response => {
            this.clearPollInterval();
            this.loaded = true;
            if (response.status !== 0 && response.status !== 500) {
                this.runData = response.json();
                this.runArray = [];
                this.totalCount = this.runData.payload.total;
                for (let [key, val] of Object.entries(this.runData.payload)) {
                    if (key !== 'total') {
                        val['child_schedule_ids'].forEach(childVal => {
                            childVal = setDefValues(childVal);
                            childVal['runId'] = key;
                        });
                        val = setDefValues(val);
                        val.childData = val['child_schedule_ids'];

                        this.runArray.push(val);
                    }
                }

                this.runArray = _.sortBy(this.runArray, ['serial_no']).reverse();
                this.end = this.getEnd();
                /*this.pollData();*/
            }
        });
    }

    ngOnInit() {
        this.getData('add');
    }

    ngOnDestroy() {
        // Will clear when component is destroyed e.g. route is navigated away from.
        this.habitualSubscription.unsubscribe();
        this.clearPollInterval();
    }
}

interface IValue {
    prop1: string;
    prop2: string;
}

interface IType {
    [code: string]: IValue;
}

function setDefValues(eachData) {
    eachData.timestamp = new Date(eachData.executed_at * 1000).toLocaleString('en-GB');
    eachData.collapsed = false;
    eachData.isDownloading = false;
    return eachData;
}

