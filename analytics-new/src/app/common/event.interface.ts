export interface EventSchema {
  type: string;
  value: Array<any>;
  showGroupBy: boolean;
  showWhere: boolean;
  showActionPerformed: boolean;
  showCopy: boolean;
  isIterable: boolean;
  where: Array<WhereData>;
  groupBy: Array<GroupData>;
  actionPerformed: Array<ActionPerformedData>;
}

interface WhereData{
  name: string;
  value: any;
  param: Array<any>;
  operator: Array<string>;
  tblName: string;
  dataType: string;
  operators: Array<string>;
  whereData: Array<any>;
  whereValueData: Array<any>;
}

interface GroupData{
  name: string;
  value: string;

}

interface ActionPerformedData{
  name: string;
  value: string;
  param: Array<any>;
  operator: Array<string>;
  tblName: string;
}
