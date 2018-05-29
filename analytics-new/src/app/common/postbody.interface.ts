export interface Aggregate {
  aggregateType: string;
  column: string;
}

export interface Operator {
  operator: string;
}

export interface Condition {
  fieldName: string;
  operator: Operator;
  value: string;
}

export interface Filter {
  name: '';
  conditions: Condition[];
}

export interface Group {
  fields: string[];
}

/*export interface Page {
  pageNumber: number;
  pageSize: number;
}*/

export interface Sort {
  fields: string[];
  sortOrder: string;
}

export interface PostbodyInterface {
  aggregate: Aggregate;
  entity: string;
  fields: string[];
  filters: Filter[];
  group: Group;
  sort: Sort;
}
