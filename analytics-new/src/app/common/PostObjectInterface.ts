import { PostbodyInterface} from './postbody.interface';
import { Condition} from './postbody.interface';

export interface PostObjectInterface{
  rqlObject: PostbodyInterface;
  startTime: number;
  endTime: number;
  commonCondition: Condition[];

}

