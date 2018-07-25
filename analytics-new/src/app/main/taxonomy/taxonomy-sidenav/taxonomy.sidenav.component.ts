import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TaxonomyService} from '../taxonomy.service';

@Component({
  selector   : 'fuse-tax-sidenav',
  templateUrl: './taxonomy.sidenav.component.html',
  styleUrls  : ['taxonomy.sidenav.component.scss']
})

export class TaxonomySidenavComponent implements OnInit{
  events: Array<any>;
  constructor(private route: ActivatedRoute, private router: Router, private taxonomyService: TaxonomyService){
    this.events = [
      {
        'name': 'Uncategorized Events',
        'url': './events/uncategorized'
      }
    ];

  }

  ngOnInit(){
    this.taxonomyService.getCategories().subscribe(response => {
      if (response.status !== 500) {
          response.payload.forEach(eachResponse => {
            if (eachResponse.dependancy) {
                const obj = {name: eachResponse.group_desc||eachResponse.group_type, url: './events/' + eachResponse.group_id};
                this.events.push(obj);
            }
          });
      }
    });

  }

}
