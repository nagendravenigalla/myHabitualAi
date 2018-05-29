import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import { EditAttributeComponent} from './edit.attribute.component';
import { TaxonomyService} from "../taxonomy.service";

@Component({
  selector: 'fuse-attribute-tax',
  templateUrl: 'attribute.component.html',
  styleUrls: ['attribute.component.scss']
})

export class AttributeComponent implements OnInit{
  attributes: Array<any> = [];
  editAttributeData = {attr_id: '', name: '', displayName: '', isVisible: '', type: '',  isGroupable:''};
  params: string;
  attributesLoaded: boolean = true;
  constructor(private route: Router, activatedRoute: ActivatedRoute, public dialog: MatDialog,private taxonomyService: TaxonomyService){
    activatedRoute.params.subscribe( params => {
        this.params = params.attributeName;
        this.getAttributes();
    });
  }

  openDialog(object): void {
    const dialogRef = this.dialog.open(EditAttributeComponent, {
      width: '350px',
      data: object
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const obj = {
          attr_id: result.attr_id,
          display_name: result.displayName,
          entity_name: result.type,
            data_type: '',
          displayable: result.isVisible,
            groupable: result.isGroupable
        };
        this.taxonomyService.editAttributes(obj.attr_id,obj).subscribe( response => {
            this.getAttributes();
        });
      }
    });
  }

  update(attribute){
    this.editAttributeData.name = attribute.field_name;
      this.editAttributeData.attr_id = attribute.attr_id;
    this.editAttributeData.displayName = attribute.display_name;
    this.editAttributeData.isVisible = attribute.displayable;
    this.editAttributeData.type = attribute.entity_name;
    this.editAttributeData.isGroupable = attribute.groupable;
    this.openDialog(this.editAttributeData);
  }

  getAttributes(){
      this.attributesLoaded = false;
      let attrType = '';
      if(this.params === 'uncategorized'){
          attrType = 'NA';
      }else if(this.params === 'events'){
          attrType = 'event';
      }else if(this.params === 'user'){
          attrType = 'user';
      }
      this.attributes = [];
      this.taxonomyService.getAttributes(attrType).subscribe( response => {
          this.attributes = response.payload;
          this.attributesLoaded = true;
      });
  }

  ngOnInit(){

  }
}
