export interface PostCategoryObjectInterface{
    categories: Array<EachCategory>;
}

export interface EachCategory{
    subgroup_name:string;
    subgroup_desc: string;
    subgroup_id: any;
}
