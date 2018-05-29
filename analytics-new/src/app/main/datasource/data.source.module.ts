import { NgModule } from '@angular/core';
import { DataSourceComponent } from './data.source.component';
import { Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path     : '**',
    component: DataSourceComponent/*,
        resolve  : {
            data: CafyneDataSourceService
        }*/
  }
];

@NgModule({
  declarations: [
    DataSourceComponent
  ],
  imports:      [
    RouterModule.forChild(routes)
  ]
})
export class DataSourceModule
{
}
