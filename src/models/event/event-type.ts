import {
    Table,
    Column,
    DataType,
    Scopes,
    HasMany,
    Unique,
    createIndexDecorator,
} from "sequelize-typescript";

import { Model, Event } from "../index";


import { v4 as uuid } from "uuid";
const UniqIndex = createIndexDecorator({
    name: uuid() + '-index',
    type: 'UNIQUE',
    unique: true,
});

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
    //  @UniqIndex
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


    static Matricula = 'Matricula'
    static ConfirmacaoMatricula = 'ConfirmacaoMatricula'
    static Inscricao = 'Inscricao'

}