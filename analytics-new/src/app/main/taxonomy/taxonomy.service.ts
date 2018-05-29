import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonHelper} from '../../common/common.helper';
import { PostCategoryObjectInterface, EachCategory} from './post.object.interface';
import { TaxonomyConfig} from "./taxonomy.config";

@Injectable()
export class TaxonomyService {
  private getEventsUrl: string = 'uncategorised';
  private getCategoriesUrl: string = 'categories';
  private getAttributesUrl: string = 'attributes';
  private createCategoryGroupUrl: string = 'categories';
  private recommendedCategoriesUrl: string = 'recommendedCategories';
  private categoriesEventListUrl: string = 'categoriesEventList';
  commonHelper: CommonHelper;
  taxonomyConfig: TaxonomyConfig;

  constructor(private http: Http) {
    this.commonHelper = new CommonHelper();
    this.taxonomyConfig = new TaxonomyConfig();
    this.getEventsUrl = this.taxonomyConfig.getUrl('uncategorised');
      this.getCategoriesUrl = this.taxonomyConfig.getUrl('categories');
      this.getAttributesUrl = this.taxonomyConfig.getUrl('attributes');
      this.createCategoryGroupUrl = this.taxonomyConfig.getUrl('categories');
      this.recommendedCategoriesUrl = this.taxonomyConfig.getUrl('recommendedCategories');
      this.categoriesEventListUrl = this.taxonomyConfig.getUrl('categoriesEventList');


  }

  getEvents(value = null): Observable<any>{
      let url = this.getEventsUrl;
      if (value){
          url = url + value;
      }
      return this.http.get(url).map(res => {
          return res.json();
      }).pipe(catchError(
          this.commonHelper.handleError('get events', [])));
  }

  getAttributes(attrType): Observable<any>{
    const url = this.getAttributesUrl + '/' + attrType;
    return this.http.get(url).map(res => {
        return res.json();
    }).pipe(catchError(
        this.commonHelper.handleError('get Attributes', [])));
  }

  createCategoryGroup(obj): Observable<any>{
      const url = this.createCategoryGroupUrl;
      return this.http.post(url, obj).map(res => {
          return res.json();
      }).pipe(catchError(
          this.commonHelper.handleError('create categories', [])));
  }

  editAttributes(id, obj): Observable<any>{
      const url = this.getAttributesUrl;
      return this.http.put(url + '/' + id, obj).map(res => {
          return res.json();
      }).pipe(catchError(
          this.commonHelper.handleError('edit categories', [])));
  }

  getCategories(attr = ''): Observable<any>{
      let url = this.getCategoriesUrl;
      if (attr){
          url = url + '?attr_id=' + attr;
      }
      return this.http.get(url).map(res => {
          return res.json();
      }).pipe(catchError(
          this.commonHelper.handleError('get categories', [])));
  }

  createPostObjectForCreateGroup(obj, actionType, attrVal): PostCategoryObjectInterface {
        const categoryObject = {categories: []};
        obj.forEach(eachObject => {
            let catObject: EachCategory = {
                name: '',
                description: '',
                use_for_recommendation: false,
                recommendation_id: undefined,
                attr_id: attrVal
            };
            if (actionType === 'new' && !eachObject.recommendation_id) {
                catObject = {
                   name: eachObject.name,
                   description: eachObject.description,
                   use_for_recommendation: eachObject.use_for_recommendation,
                    recommendation_id: eachObject.recommendation_id,
                    attr_id: attrVal
                };
               categoryObject.categories.push(catObject);
            }else if (actionType === 'update' && eachObject.recommendation_id){
                catObject = {
                    name: eachObject.name,
                    description: eachObject.description,
                    use_for_recommendation: eachObject.use_for_recommendation,
                    recommendation_id: eachObject.recommendation_id,
                    attr_id: attrVal
                };
                categoryObject.categories.push(catObject);
            }
        });
        return categoryObject;
  }

  setRecommendedCategories(obj, actionType, attrVal): Observable<any>{
    const postObj = this.createPostObjectForCreateGroup(obj, actionType, attrVal);
    if (postObj.categories.length > 0) {
        const url = this.recommendedCategoriesUrl;
        return this.http.post(url, postObj).map(res => {
            return res.json();
        }).pipe(catchError(
            this.commonHelper.handleError('set recommended Categories', [])));
    }else{
        return Observable.of<any>();

    }
  }

  updateRecommendedCategories(obj, actionType, attrVal): Observable<any>{
        const postObj = this.createPostObjectForCreateGroup(obj, actionType, attrVal);
        if (postObj.categories.length > 0) {
            const url = this.recommendedCategoriesUrl;
            return this.http.put(url, postObj).map(res => {
                return res.json();
            }).pipe(catchError(
                this.commonHelper.handleError('update recommended Categories', [])));
        }else{
            return Observable.of<any>();
        }
  }

  getRecommendedCategories(): Observable<any>{
        const url = this.recommendedCategoriesUrl;
        return this.http.get(url).map(res => {
            return res.json();
        }).pipe(catchError(
            this.commonHelper.handleError('get recommended Categories', [])));
  }

  getCategoriesEventList(): Observable<any>{
      const url = this.categoriesEventListUrl;
      return this.http.get(url).map(res => {
          return res.json();
      }).pipe(catchError(
          this.commonHelper.handleError('get Categories list', [])));
  }

}


