export interface PostCategoryObjectInterface{
    categories: Array<EachCategory>;
}

export interface EachCategory{
    name:string;
    description: string;
    use_for_recommendation: boolean;
    recommendation_id: boolean;
    attr_id: number;
}
