

    export interface Condition {
        fieldName: string;
        value: string;
        operator: string;
    }

    export interface Filter {
        name: string;
        groupBy: string;
        conditions: Condition[];
    }

    export interface GqlObject {
        filters: Filter[];
    }

    export interface CommonCondition {
        fieldName: string;
        value: string;
        operator: string;
    }

    export interface GQLInterface {
        gqlObject: GqlObject;
        agg_level: string;
        endTime: number;
        startTime: number;
        commonCondition: CommonCondition[];
    }

    export interface GQLPostObject{
        request_json: GQLInterface;
    }



