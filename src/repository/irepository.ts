import { Paginate } from "./repository";

export default interface IRepository<T> {
  one(id: string, query?: any): Promise<T | undefined>;
  oneBy(query: any): Promise<T | undefined>;
  create(data: any,opts?:any): Promise<T | undefined>;
  update(data: any): Promise<T | undefined>;
  delete(data: any): Promise<any>;

  first(): Promise<T | undefined>;
  last(): Promise<T | undefined>;
  disable(data: any): Promise<T | undefined>;
  enable(data: any): Promise<T | undefined>;
  //clear(): Promise<boolean>;
  all(opts?: any): Promise<Array<T> | undefined>;
  paginated:(opts?: any)=>Promise<Paginate<T> | undefined> ;
}