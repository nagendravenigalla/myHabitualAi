import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject, OnInit} from '@angular/core';
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
export class CreateCategoryComponent implements OnInit{
    editData = {name: '', description: '', use_for_recommendation:false };
    isEdit = false;
    index = null;
  subCategories: Array<any> = [];
  error = false;
  pageNumber:number = 0;
  categoryList:any;
  events: Array<any> = [];
  attVal: any;
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
              const newCategories = this.taxonomyService.setRecommendedCategories(this.subCategories,'new', this.attVal);
              const updateCategories = this.taxonomyService.updateRecommendedCategories(this.subCategories,'update', this.attVal);
              newCategories.merge(updateCategories).subscribe( res => {
                  this.taxonomyService.getRecommendedCategories().subscribe(response => {
                      this.subCategories = response.payload;
                  });
                  this.taxonomyService.getEvents('?q=na').subscribe( response => {
                      this.events = response.payload;
                      this.loaderObj.eventListLoader = false;
                  })
              });
          }
      }else if(s === 1){
          this.loaderObj.sumLoader = true;
          const objectArray = {'objects':[]};
          this.subCategories.forEach(subCategory => {
              const obj = {recommendation_id : '',event_list:[], attr_id:this.attVal};
              obj.recommendation_id = subCategory.recommendation_id;
              objectArray.objects.push(obj);
          });
          this.events.forEach(event => {
              objectArray.objects.forEach(subCategoryObj => {
                  if (event.groupName === subCategoryObj.recommendation_id){
                      subCategoryObj.event_list.push(event.event_id)
                  }
              });
          });
          this.taxonomyService.createCategoryGroup(objectArray).subscribe(response => {
              this.taxonomyService.getCategoriesEventList().subscribe(response => {
                  const arr = _.uniqBy(response.payload, 'recommendation_id');

                  arr.forEach(eachValue => {
                      eachValue.eventList = [];
                  });
                  response.payload.forEach(eachEvent => {
                      arr.forEach(eachCategory => {
                          if(eachCategory.recommendation_id === eachEvent.recommendation_id) {
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
      if(category.name && category.description) {
          if(this.isEdit && this.index !== null) {
              this.subCategories[this.index].name = category.name;
              this.subCategories[this.index].description = category.description;
              this.isEdit = false;
              this.index = null;
          }else{
              this.subCategories.push(category);
          }
          this.editData.name = '';
          this.editData.description = '';
      }else{
        this.error = true;
      }
  }

  editCategory(index, cat){
      const category = _.cloneDeep(cat);
      this.editData.description = category.description;
      this.editData.name = category.name;
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

  ngOnInit(){
      this.loaderObj.subCatLoader = true;
      this.taxonomyService.getRecommendedCategories().subscribe(response => {
          if(response.status!==404 && response.status!==500 && response.status!==400){
              this.subCategories = response.payload;
          }
          this.loaderObj.subCatLoader = false;
      })

  }

}
