
import { Request, Response } from "express";
import { Contact, Person } from "../../models/index";
import IRepository from "../../repository/iRepository";
import { Paginate } from "../../repository/repository";
import { DefaultRepository as Repository } from "../../repository/index";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class ContactApi {
  constructor(private repo: IRepository<Contact>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const model: Contact | void = await this.repo.create(body);

    return res.json(model);
  };
  update = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const { body: models, } = req;
    const { updatedById } = models
    let finalContact = []

    if (Array.isArray(models)) {

      const contacts: Contact[] = await Contact.findAll({where: {personId:id}})
      const contactsUnable = contacts.filter((c: Contact) => !models.map((c: any) => c.id).includes(c.id))

      for (let model of models) {
        model.personId = id
        if (model.id) {
          finalContact.push(await this.repo.update({ ...model, updatedById }, { where: { id: model.id }, returning: true }));
        } else {
          finalContact.push(await this.repo.create({ ...model, updatedById }));
        }
      }
      let updated=
      Contact.update({ isActive: false }, {
        where: {
          id:
          contactsUnable?.map((c: Contact) => c.id)
        }
      })

      return res.json(finalContact);

    } else {
      const updatedContact = await this.repo.update({ ...models, updatedById })

      return res.json(updatedContact);

    }


  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query: opts } = req;


    const model: Contact | undefined = await this.repo.one(
      id,
      { ...opts, include: { all: true } }
    );
    return res.json(model);
  };
  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    //    const { query: opts } = req;

    const model: Contact | undefined = await this.repo.delete(id);
    return res.json(model);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const models: Paginate<Contact> | undefined =
      await this.repo.paginated({ ...req.query, include: { all: true } });
    return res.json(models);
  };
}

export default new ContactApi(new Repository(Contact));
export { ContactApi };
