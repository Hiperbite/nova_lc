import {
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    Scopes,
    BeforeCreate,
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";

import { v4 as uuidv4 } from "uuid";
import { Model, Person, TicketState, TicketType, User } from "../index";


@Scopes(() => ({
    default: {
        include: [
            { model: User, include: [Person], as: 'user' },
            { model: User, include: [Person], as: 'attendedBy' },
        ]
    }
}))
@Table({
    timestamps: true,
    tableName: "Tickets",
})
export default class Ticket extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    code?: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    descriptions?: string;

    @ForeignKey(() => User)
    userId?: string;

    @BelongsTo(() => User)
    user?: User;

    @BelongsTo(() => User)
    attendedBy?: User;

    @ForeignKey(() => User)
    attendedById?: string;

    @ForeignKey(() => TicketType)
    typeId?: string;

    @BelongsTo(() => TicketType)
    type?: TicketType;

    @ForeignKey(() => TicketState)
    stateId?: string;

    @BelongsTo(() => TicketState)
    state?: TicketState;

    @BeforeCreate
    static beforeCreateTicket = async (ticket: Ticket) => {
        const state = await TicketState.findOne({ where: { code: TicketState.Opened } })
        const type = await TicketType.findByPk(ticket?.typeId)
        ticket.stateId = state?.id;
        let code = await SequenceApp.count(CODES.TICKET);

        ticket.code = 'TKT' + (type?.code ?? '') + String(code).padStart(8, '0');
    }
}

