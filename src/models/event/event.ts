import {
    Table,
    Column,
    DataType,
    Scopes,
    BelongsTo,
    ForeignKey,
    BeforeCreate,
    BeforeSave,
    HasMany,
} from "sequelize-typescript";
import moment from "moment";
import { Model, EventType, EventSchedule } from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

@Scopes(() => ({
    default: {
        include: []
    }
}))
@Table({
    timestamps: true,
    tableName: "Events",
})
export default class Event extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

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
    get nextStates() {

        const states: any = ['Agendar']/*{
            'Opened': ['Aproved', 'Rejected'],
            'Aproved': ['Done'],
            'Done': ['Opened'],
            'Rejected': ['Opened'],
            '*': ['Opened']
        }[this?.state?.code ?? '*']/**/
        //Rejected,Opened, Aproved, Done
        return states;
    }
 
    @Column({
        type: DataType.VIRTUAL,
    })
    get activeSchedules(): EventSchedule[] {
        return this.schedules?.filter((s: EventSchedule) => moment(s.end) >= moment(moment().format('YYYY-MM-DD'))).sort((a: EventSchedule, b: EventSchedule)=>a.start>b.start ? 1 : -1)
    }

    @BelongsTo(() => EventType)
    type!: EventType

    @HasMany(() => EventSchedule)
    schedules!: EventSchedule[]

    @ForeignKey(() => EventType)
    typeId!: string;

    @BeforeCreate
    @BeforeSave
    static initModel = async (event: Event) => {

        let code = await SequenceApp.count(CODES.EVENT);
        event.code = 'EVT' + String(code).padStart(8, '0');

    };
}