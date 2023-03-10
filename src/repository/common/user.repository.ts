
import sendEmail from "../../application/mailler/mailler";
import { Contact, User } from "../../models/index";
import IRepository from "../irepository";
import Repository, { Paginate } from "../repository";


class UserRepository extends Repository<User> implements IRepository<User> {
    
    constructor() {
        super(User);
    }
    oneBy(query: any): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }

    private defaultOptions = async () => ({
        attributes: Object.keys(await User.describe()),
        include: [Contact, User],
    });

    one = async (id: string, { attributes }: any = {}): Promise<User | undefined> => {
        const options = { ... await this.defaultOptions(), attributes };
        const user: User | undefined = await this.findOne(id, options);
        return user;
    };

    create = async (data: any,transaction:any=null): Promise<User | undefined> => {

        const user = await this.createOne(data, transaction);
        if (user?.id !== undefined) {
                await sendEmail({
                    to: user.email,
                    from: "test@hiperbite.com",
                    subject: "Verify your email",
                    text: `verification code: ${user.verificationCode}. Id: ${user.id}`,
                });

        }
        return user;
    };

    update = async (data: any): Promise<User | undefined> => {
        return await this.updateOne(data);
    };

    delete = async (data: any): Promise<boolean> => {
        return await this.deleteBy(data.id);
    };

    all = async (): Promise<User[] | undefined> => {
        const options = { include: null, attributes: null };

        const data: User[] | undefined = await this.findAll(options);
        return data;
    };

    allBy = async (query: any): Promise<User[] | undefined> => {
        const where = query;
        const options = { include: null, attributes: {}, where };

        const data: User[] | undefined = await this.findAll({});
        return data;
    };

    first = async (): Promise<User | undefined> => await this.first();
    last = async (): Promise<User | undefined> => await this.last();
    disable = async (data: any): Promise<User | undefined> =>
        await this.disable(data.id);
    enable = async (data: any): Promise<User | undefined> =>
        await this.enable(data.id);

    clear = async () => {
        return true;
    };
    paginated = async (
        options: any
      ): Promise<Paginate<User> | undefined> => this.paginate(User, options)
}
export default new UserRepository();