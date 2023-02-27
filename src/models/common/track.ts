
import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "../index";

@Table({
    timestamps: true,
    tableName: "Tracks",
})
export default class Track extends Model {

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    get before() {
        return JSON.parse(this.getDataValue('before'));
    }
    set before(value) {
        this.setDataValue('before', JSON.stringify(value));
    }
    
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    get after() {
        return JSON.parse(this.getDataValue('after'));
    }
    set after(value) {
        this.setDataValue('after', JSON.stringify(value));
    }

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    model?: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    ref?: string;

    @ForeignKey(() => User)
    userId?: string;

    @BelongsTo(() => User)
    user?: User;
}