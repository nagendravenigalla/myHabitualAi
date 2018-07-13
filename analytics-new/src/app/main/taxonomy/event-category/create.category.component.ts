import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject, OnInit, OnChanges} from '@angular/core';
import { TaxonomyService} from '../taxonomy.service';
import * as _ from 'lodash';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'fuse-edit-category-dialog',
  templateUrl: './create.category.dialog.html',
  styleUrls: ['create.category.component.scss']
})
export class CreateCategoryComponent implements OnInit, OnChanges{
    editData = {subgroup_name: '', subgroup_desc: '', subgroup_id:''};
    newSubCategories = [];
    isEdit = false;
    index = null;
  subCategories: Array<any> = [];
  error = false;
  pageNumber:number = 0;
  categoryList:any;
  events: Array<any> = [];
  attVal: any;
  totalEvents: Array<any> = [];
  start: number = 0;
  end: number = 10;
  page: number = 1;
  step: number = 10;
  showNext: boolean = true;
  loaderObj = {subCatLoader: false, eventListLoader:false,sumLoader:false};
  constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private taxonomyService: TaxonomyService) {
      dialogRef.disableClose = true;
        this.attVal = data.attVal;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit(s): void{
      if(s===0) {
          if (this.subCategories.length > 0) {
              this.loaderObj.eventListLoader = true;
              this.newSubCategories = this.subCategories;
              //const newCategories = this.taxonomyService.setRecommendedCategories(this.subCategories,'new', this.attVal); 
              const updateCategories = this.taxonomyService.updateRecommendedCategories(this.subCategories,'update', this.attVal);
              updateCategories.subscribe( res => {
                  this.taxonomyService.getRecommendedCategories(this.attVal).subscribe(response => {
                      this.subCategories = response.payload;
                  });
                  this.taxonomyService.getEvents('?group_id=' + this.attVal).subscribe( response => {
                      this.totalEvents = response.payload;
                      this.events = this.totalEvents.slice(this.start,this.end);
                      this.loaderObj.eventListLoader = false;
                  })
              });
          }
      }else if(s === 1){
          this.loaderObj.sumLoader = true;
          const objectArray = {'category':[]};
          this.newSubCategories.forEach(subCategory => {
              const obj = {subgroup_name : '', subgroup_desc : '', subgroup_id : '', event_list:[], group_id:this.attVal};
              obj.subgroup_id = subCategory.subgroup_id;
              obj.subgroup_name = subCategory.subgroup_name;
              obj.subgroup_desc = subCategory.subgroup_desc;
              objectArray.category.push(obj);
          });
          this.events.forEach(event => {
              objectArray.category.forEach(subCategoryObj => {
                  if (event.groupName === subCategoryObj.subgroup_id){
                      subCategoryObj.event_list.push(event.event_id)
                  }
              });
          });
          this.taxonomyService.createCategoryGroup(objectArray).subscribe(response => {
              this.taxonomyService.getCategoriesEventList(this.attVal).subscribe(response => {
                  const arr = _.uniqBy(response.payload, 'subgroup_id');

                  arr.forEach(eachValue => {
                      eachValue.eventList = [];
                  });
                  response.payload.forEach(eachEvent => {
                      arr.forEach(eachCategory => {
                          if(eachCategory.subgroup_id === eachEvent.subgroup_id) {
                              eachCategory.eventList.push(eachEvent.event_id);
                          }
                      });
                  });
                  this.categoryList = _.cloneDeep(arr);
                  this.loaderObj.sumLoader = false;
              });
          });

      }
  }

  addNewSubCategory(cat){
    const category = _.cloneDeep(cat);
      if(category.subgroup_name && category.subgroup_desc) {
          if(this.isEdit && this.index !== null) {
              this.subCategories[this.index].subgroup_name = category.subgroup_name;
              this.subCategories[this.index].subgroup_desc = category.subgroup_desc;
              this.isEdit = false;
              this.index = null;
          }else{
              this.subCategories.push(category);
          }
          this.editData.subgroup_name = '';
          this.editData.subgroup_desc = '';
      }else{
        this.error = true;
      }
  }

  editCategory(index, cat){
      const category = _.cloneDeep(cat);
      this.editData.subgroup_desc = category.subgroup_desc;
      this.editData.subgroup_name = category.subgroup_name;
      this.isEdit = true;
      this.index = index;
  }

  deleteFromList(index){
    this.subCategories.splice(index, 1);
  }

  next(){
    ++this.pageNumber;
  }

  previous(){
      --this.pageNumber;
  }

  onFinalClick(){
    this.dialogRef.close();
  }

  changeVisibility(event,i){
      event.showDropDown = !event.showDropDown;
  }

  previousPaginate(){
      this.start = this.start - this.step;
      this.end = this.end - this.step;
      this.events = [];
      this.events = this.totalEvents.slice(this.start,this.end);
      --this.page;
      this.showNext = this.page * this.start <= this.totalEvents.length;
  }

  nextPaginate(){
      if(this.page * this.start <= this.totalEvents.length) {
          this.start = this.start + this.step;
          this.end = this.end + this.step;
          this.events = [];
          ++this.page;
          this.events = this.totalEvents.slice(this.start, this.end);
          this.showNext = this.page * this.start <= this.totalEvents.length;
      }else{
          this.showNext = false;
      }
  }

  ngOnInit(){
      this.loaderObj.subCatLoader = true;
      this.taxonomyService.getRecommendedCategories(this.attVal).subscribe(response => {
          if(response.status!==404 && response.status!==500 && response.status!==400){
            const arr = _.uniqBy(response.payload, 'subgroup_id');
              this.subCategories = arr;
          }
          this.loaderObj.subCatLoader = false;
      })

  }
  ngOnChanges(){
      
  }

}
