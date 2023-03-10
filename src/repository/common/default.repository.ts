import {
  Model as M,
  ModelCtor,
  Repository as Repo,
} from "sequelize-typescript";
import sequelize from "../../models/index";
import IRepository from "../irepository";

export default class DefaultRepository<T extends M> implements IRepository<T> {
  repo: Repo<T>;
  constructor(private Model: ModelCtor<T>) {
    this.repo = sequelize.getRepository(Model);
  }

  protected t: any;
  protected startTransaction = async () => this.t = this.t ?? await sequelize.transaction();
  private refactorOptions = async ({
    attributes: attr,
    exclude = [],
    include,
  }: any): Promise<any> => {
    const modelAttrs = Object.keys(await this.Model.describe());
    const toArray = (str: any): string[] =>
      typeof str === "string" ? str?.split(",") : str;
    const attributes = toArray(attr ?? "")
      .filter((x: string) => toArray(modelAttrs).indexOf(x) !== -1)
      .filter((x: string) => toArray(exclude).indexOf(x) === -1);

    return {
      include,
      attributes: attributes.length === 0 ? null : attributes,
      exclude,
    };
  };
  public one = async (id: string, opts: any = {}): Promise<T | undefined> => {
    const options = await this.refactorOptions(opts);
    const data = await this.Model.findByPk(id, options);
    if (data === null) {
      throw { code: 404, message: "Record not found" }
    }
    return data ?? undefined;
  };

  public create = async (data: any, options: any = {}): Promise<T | undefined | any> => {

    return await this.Model.create(data, options);
  };

  public update = async (data: any, opts: any = {}): Promise<T | any> => {
    const { ["id"]: _, ...d } = data;
    const { id } = data;

    const model = await this.Model.findByPk(id);
    if (model === null) {
      throw { code: 400, message: 'Resource not found to update' }
    }
    await model?.update(d, { ...opts });
    return model;

  };

  public delete = async (id: any | string): Promise<boolean> => {
    const model = await this.Model.destroy({
      where: { id }
    });

    return model == 1;
  };

  public oneBy = async (options: any): Promise<any> => {
    try {
      const data: M | undefined = await this.Model.findOne(options);
      return data;
    } catch (e) {
      const x = e;
      return null;
    }
  };

  public all = async (options: any): Promise<T[] | any> => {
    const { where, include, attributes, limit = 6, offset = 0 } = options;
    const data: T[] = await this.Model.findAll({
      where,
      include,
      attributes,
      offset,
      limit,
    });
    return data;
  };
  public allBy = async (options: any): Promise<T[] | undefined> => {
    const { where, include, attributes, limit = 6, offset = 0 } = options;
    return await this.Model.findAll({
      where,
      attributes,
      include,
      offset,
      limit,
    });
  };

  public paginate = async (
    Model: ModelCtor<T>,
    options: any
  ): Promise<Paginate<T> | undefined> => {
    const {
      where,
      attributes,
      include,
      exclude,
      pageSize = 6,
      page = 1,
      order = [["createdAt", "DESC"]],
    } = options;

    const limit = Number(pageSize);

    const offset =
      Number(page) < 1
        ? 0
        : (Number(page) - 1) * limit;

    return new Paginate(
      await this.Model.findAll({
        where,
        attributes: attributes
          ? attributes
            ?.split(",")
            .filter((x: string) => exclude.indexOf(x) === -1)
          : { exclude },
        include,
        offset,
        limit,
        order,
      }),
      Number(page),
      limit,
      await this.size(options)
    );
  };

  public first = async (): Promise<T | undefined> => {
    const object = await this.Model.findOne({ order: [["createdAt", "DESC"]] });
    return object ?? undefined;
  };

  public last = async (): Promise<T | undefined> => {
    const object = await this.Model.findOne({ order: [["createdAt", "ASC"]] });
    return object ?? undefined;
  };

  public disable = async (
    id: any
  ): Promise<T | undefined | number | any> =>
    await this.Model.update({ isActive: false }, { where: { id } });

  public enable = async (id: any): Promise<T | undefined | number | any> =>
    await this.Model.update({ isActive: false }, { where: { id } });

  public clear = function (Model: ModelCtor<T>) {
    //  - Delete all the records from the collection
  };

  public size = async (options: any): Promise<number> => {
    const { where } = options;
    return await this.Model.count({ where });
  };

  public classOf = (className: string) => eval(className);
  paginated = async (
    options: any
  ): Promise<Paginate<T> | undefined> => this.paginate(this.Model, options)
}

export class Paginate<T> {
  public pages: number = 0;
  public message: string[] = [];
  constructor(
    public data: T[],
    public page: number,
    public pageSize: number,
    public total: number
  ) {
    this.pages = roundUp(this.total / this.pageSize);

    if (1 > this.page) {
      this.message.push(`page ${this.page} doesn't exist, replaced with ${1}`);
      this.page = 1;
    }
    if (this.page > this.pages) {
      this.message.push(
        `page ${this.page} doesn't exist, replaced with ${this.pages}`
      );
      this.page = this.pages;
    }
  }
}

// find a better place to put this
function roundUp(num: number, precision: number = 0) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

roundUp(192.168, 1); //=> 192.2
