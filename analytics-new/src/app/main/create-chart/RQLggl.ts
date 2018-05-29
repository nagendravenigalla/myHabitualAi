import gql from 'graphql-tag';

export const query = gql`
  query analytics($aggLevel: String!) {
      analytics(aggLevel: $aggLevel) {
        windowId
        avgTxnMetric
        uniqueUsers
      }
  }  
`;
const firstVal = "name\n";
const val = `query analytics($startEpoch: Int!, $endEpoch: Int!, $aggLevel: String!) {
    analytics(startEpoch: $startEpoch, endEpoch: $endEpoch, aggLevel: $aggLevel, city:$city, gender: $gender) {
        ${firstVal}
        avgTxnMetric
        uniqueUsers
    }
}`;
export const eventQuery = gql`${val}`;

export const schemaQuery = gql`{
  __schema{
    types{
      ${firstVal}
      description
      fields{
        name
        
        type{
          name
        }
      }
    }
  }
}`;



