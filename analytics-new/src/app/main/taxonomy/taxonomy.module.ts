import { NgModule} from '@angular/core';
import { TaxonomyComponent} from './taxonomy.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { Routes, RouterModule} from '@angular/router';
import { TaxonomySidenavModule} from './taxonomy-sidenav/taxonomy.sidenav.module';
import { AttributeComponent} from './taxonomy-property/attribute.component';
import { CommonModule} from '@angular/common';
import { EventCategoryComponent} from './event-category/event.category.component';
import { EditAttributeComponent} from './taxonomy-property/edit.attribute.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { TaxonomyService} from './taxonomy.service';
import { CreateCategoryComponent} from './event-category/create.category.component';
import {MatSelectModule} from '@angular/material/select';
import { TranslateModule} from "@ngx-translate/core";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DeleteConfirmModule} from "../delete-confirmation/delete.confirm.module";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
    {
        path     : '',
        component: TaxonomyComponent,
        children : [
          {path: '', redirectTo: 'events/uncategorized', pathMatch: 'full'},
          {path: 'attributes/:attributeName', component: AttributeComponent},
          {path: 'events/:eventName', component: EventCategoryComponent},

        ],
    }
];


@NgModule({
  exports: [TaxonomyComponent, AttributeComponent, EventCategoryComponent, EditAttributeComponent, CreateCategoryComponent],
  imports: [MatSidenavModule,
      MatIconModule,
      RouterModule.forChild(routes),
      TranslateModule.forChild(),
      TaxonomySidenavModule,
      CommonModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      MatRadioModule,
      FormsModule,
      MatSelectModule,
      MatCheckboxModule,
      MatSlideToggleModule,
      DeleteConfirmModule,
      MatProgressSpinnerModule
  ],
  declarations: [TaxonomyComponent, AttributeComponent, EventCategoryComponent, EditAttributeComponent, CreateCategoryComponent],
  providers: [TaxonomyService],
  entryComponents: [EditAttributeComponent, CreateCategoryComponent]
})

export class TaxonomyModule{}
