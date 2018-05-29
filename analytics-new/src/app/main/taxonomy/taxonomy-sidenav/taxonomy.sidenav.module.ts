import { NgModule} from '@angular/core';
import { TaxonomySidenavComponent} from './taxonomy.sidenav.component';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { CommonModule} from '@angular/common';
import { TaxonomyService} from '../taxonomy.service';

@NgModule({
  exports:      [TaxonomySidenavComponent],
  imports:      [RouterModule, CommonModule],
  declarations: [TaxonomySidenavComponent],
    providers:  [TaxonomyService]
})

export class TaxonomySidenavModule{}
