import {
    Table,
    Column,
    DataType,
    Scopes,
    HasMany,
    Unique,
} from "sequelize-typescript";

import { Model, Event , UniqIndex} from "../index";

@Scopes(() => ({
    default: {
        include: []
    }
}))
@Table({
    timestamps: true,
    tableName: "EventTypes",
})
export default class EventType extends Model {
    @UniqIndex
    @Unique({ name: "code", msg: "code_should_be_unique" }) // add this line
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    descriptions?: string;

    @HasMany(() => Event)
    events?: Event[]

}