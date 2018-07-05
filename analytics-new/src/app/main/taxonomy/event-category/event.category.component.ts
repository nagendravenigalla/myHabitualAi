import { Component} from '@angular/core';
import { CreateCategoryComponent} from './create.category.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute} from '@angular/router';
import { TaxonomyService} from '../taxonomy.service';
import { CategoryInterface, SubCategoryObject} from '../category.interface';
import * as _ from 'lodash';


@Component({
  selector: 'fuse-event-category',
  templateUrl: 'event.category.component.html',
  styleUrls: ['event.category.component.scss']
})

export class EventCategoryComponent{
  events: Array<any>;
  subCategoryEventArray: Array<any> = [];
  attrValue: string;
  subCatList: Array<any>;
  filteredEventList: Array<any>;
  selectedCategory: string;
  constructor(private dialog: MatDialog, private route: Router, activatedRoute: ActivatedRoute, private taxonomyService: TaxonomyService){
      activatedRoute.params.subscribe( params => {
          this.subCategoryEventArray = [];
          this.attrValue = '';
          this.events = [];
          if (!isNaN(params.eventName)){
              this.attrValue = params.eventName;
          }
          this.getEventList();

      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
        minWidth: 800,
        data: {attVal:this.attrValue}
    
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const categoryObject: CategoryInterface = {'categories': '', 'category' : []};
        categoryObject.categories = result.groupName;
        result.subCategories.forEach(subCategory => {
            const obj: SubCategoryObject = {subcategory : '', event_list : []};
            obj.subcategory = subCategory;
            categoryObject.category.push(obj);
        });
        result.events.forEach(event => {
            categoryObject.category.forEach(subCategoryObj => {
               if (event.groupName === subCategoryObj.subcategory){
                   subCategoryObj.event_list.push(event.event_id);
               }
            });
        });
        this.taxonomyService.createCategoryGroup(categoryObject).subscribe(response => {
            this.getEventList();
        });
      }
    });
  }

  createGroup(){
      this.openDialog();
  }

  changeEventList(event){
      this.selectedCategory = event.subgroup_id;
      this.filteredEventList = this.subCategoryEventArray.filter(subCat => {
          return subCat.subCategory === event.subgroup_id;
      })[0].events;

  }

  getEventList(){
      this.taxonomyService.getEvents().subscribe( response => {
          this.events = response.payload;
          if (this.attrValue) {
              this.taxonomyService.getCategories(this.attrValue).subscribe(res => {

                  if(res.payload && res.payload.length>0) {
                      res.payload.forEach(eachEvent => {
                          const obj = _.filter(this.events, function(event) {
                              return event.event_id * 1 === eachEvent.event_id * 1;
                          });
                          if (obj.length > 0) {
                              
                              eachEvent.event_name = obj[0].event_name;
                          }
                      });

                      const arr = _.uniqBy(res.payload, 'subgroup_id');
                    
                      this.subCatList = _.cloneDeep(arr);
                      this.selectedCategory = this.subCatList[0].subgroup_id;
        
                      arr.forEach(eachSub => {
                          const obj = {'subCategory': '', events: []};
                          obj.subCategory = eachSub.subgroup_id;
                          res.payload.forEach(eachEvent => {
                              if (eachEvent.subgroup_id === obj.subCategory) {
                         
                                  const newObj = {event_id: eachEvent.event_id, event_name: eachEvent.event_name};
                             
                                  obj.events.push(newObj);
                              }
                          });
                          this.subCategoryEventArray.push(obj);
                      });
                      if (this.subCatList[0]) {
                          
                          this.changeEventList(this.subCatList[0]);
                      }
                  }
              });
          }
      });
  }
}
