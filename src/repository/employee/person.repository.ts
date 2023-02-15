
import { Person } from "../../models/index";
import IRepository from "../irepository";
import Repository from "../repository";

class PersonRepository extends Repository<Person> implements IRepository<Person> {
   
    constructor() {
      super(Person);
    }
    oneBy(query: any): Promise<Person | undefined> {
        throw new Error("Method not implemented.");
    }

    private defaultOptions = async () => ({
        attributes: Object.keys(await Person.describe()),
        include: [Person],
    });

    one = async (id: string, options: any = {}): Promise<Person | undefined> => {
        options = { ...options, ... await this.defaultOptions(), };
        const person: Person | undefined = await this.findOne(id, options);
        return person;
    };

    create = async (data: any, transaction:any=null): Promise<Person | undefined> => {
        
        const person = await this.createOne(data,{transaction});
        return person;
    };

    update = async (data: any): Promise<Person | undefined> => {
        const {
            id,
            title,
            category,
            text,
            isActive = true,
            cover,
            user: { id: userId },
        } = data;
        await this.updateOne({
            id,
            title,
            category,
            text,
            cover,
            isActive,
            userId,
        });
        return await this.findOne(id);
    };

    delete = async (data: any): Promise<boolean> => {
        return await this.deleteBy(data.id);
    };

    all = async (): Promise<Person[] | undefined> => {
        const options = { include: null, attributes: null };

        const data: Person[] | undefined = await this.findAll(options);
        return data;
    };

    allBy = async (query: any): Promise<Person[] | undefined> => {
        const where = query;
        const options = { include: null, attributes: {}, where };

        const data: Person[] | undefined = await this.findAll({});
        return data;
    };

    first = async (): Promise<Person | undefined> => await this.first();
    last = async (): Promise<Person | undefined> => await this.last();
    disable = async (data: any): Promise<Person | undefined> =>
        await this.disable(data.id);
    enable = async (data: any): Promise<Person | undefined> =>
        await this.enable(data.id);

    clear = async () => {
        return true;
    };
}
export default new PersonRepository();