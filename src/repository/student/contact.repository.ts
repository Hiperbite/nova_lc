import { Paginate } from './../repository';

import { Contact } from "../../models/index";
import IRepository from "../irepository";
import Repository from "../repository";

class ContactRepository extends Repository<Contact> implements IRepository<Contact> {
   
    constructor() {
      super(Contact);
    }
    oneBy(query: any): Promise<Contact | undefined> {
        throw new Error("Method not implemented.");
    }

    private defaultOptions = async () => ({
        attributes: Object.keys(await Contact.describe()),
        include: [Contact],
    });

    one = async (id: string, options: any = {}): Promise<Contact | undefined> => {
        options = { ...options, ... await this.defaultOptions(), };
        const contact: Contact | undefined = await this.findOne(id, options);
        return contact;
    };

    create = async (data: any, transaction:any=null): Promise<Contact | undefined> => {
        
        const contact = await this.createOne(data,{transaction});
        return contact;
    };

    update = async (data: any): Promise<Contact | undefined> => {
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

    all = async (): Promise<Contact[] | undefined> => {
        const options = { include: null, attributes: null };

        const data: Contact[] | undefined = await this.findAll(options);
        return data;
    };

    allBy = async (query: any): Promise<Contact[] | undefined> => {
        const where = query;
        const options = { include: null, attributes: {}, where };

        const data: Contact[] | undefined = await this.findAll({});
        return data;
    };

    first = async (): Promise<Contact | undefined> => await this.first();
    last = async (): Promise<Contact | undefined> => await this.last();
    disable = async (data: any): Promise<Contact | undefined> =>
        await this.disable(data.id);
    enable = async (data: any): Promise<Contact | undefined> =>
        await this.enable(data.id);

    clear = async () => {
        return true;
    };

    paginated = async (
        options: any
      ): Promise<Paginate<Contact> | undefined> => this.paginate(Contact, options)
}
export default new ContactRepository();