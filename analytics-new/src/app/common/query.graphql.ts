import gql from 'graphql-tag';

export class GraphQlQuery {

    getQueryString(queryParams, queryParamVals) {
        const queryString = gql(`query analytics(${queryParams}) {
            analytics(${queryParamVals}) {
            windowId
            avgTxnMetric
            uniqueUsers
            fieldName
            attrValue
            }
        }
      `);
        return queryString;
    }
}



