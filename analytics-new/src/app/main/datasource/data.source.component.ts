// chart.component.ts
import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { BaseConfig} from "../../common/base.config";


@Component({
  selector: 'fuse-data-source',
  templateUrl: 'data.source.component.html',
  styleUrls  : ['data.source.component.scss']
})

export class DataSourceComponent{
  url: SafeResourceUrl;
  baseConfig: BaseConfig;
  constructor(private sanitizer: DomSanitizer) {
    this.baseConfig = new BaseConfig();
    this.url = sanitizer.bypassSecurityTrustResourceUrl(this.baseConfig.getDataSourceUrl());
  }


}
