import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseConfig} from '../../common/base.config';
import { MainService} from '../main.service';
import * as moment from 'moment';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent implements OnInit
{
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    baseConfig: BaseConfig;
    name: string = "John Doe";
    @Output()
    logoutOf: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    goToProfilePage: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private translate: TranslateService,
        private mainService: MainService
    )
    {
        this.baseConfig = new BaseConfig();
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'us'
            },
            {
                'id'   : 'tr',
                'title': 'Turkish',
                'flag' : 'tr'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

    }

    search(value)
    {
        // Do your search here...
        //console.log(value);
    }

    setLanguage(lang)
    {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }

    logout($event){
        this.logoutOf.emit({'event': $event});
    }

    goToProfile($event){
        this.goToProfilePage.emit({'event': $event});
    }

    gerUserInfo(){
        this.mainService.getUserInfo().subscribe(response => {
            if(response && response.payload){
                if(response.payload.given_name){
                    this.name = response.payload.given_name;
                }
            }
        })
    }

    ngOnInit(){
        this.gerUserInfo();
    }
}
