import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";

import { Model, Paypack } from "../";

@Table({
  timestamps: true,
  tableName: "TransactionTypes",
})
export default class TransactionType extends Model {
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
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  defaultValue?: number;

  @Column({
    type: DataType.VIRTUAL
  })
  get value() {

    if (this.referenceTypeId === null)
      return this.defaultValue;



    const arr = this.calc?.split('');
    const first = arr?.shift();
    const last = arr?.pop()
    let calcValue = String(arr?.join(''));

    let currentValue = 0

    const lastOperation = (last: string) => ['%'].includes(last ?? "")
    const firstOperation = (first: string) => !Number.isNaN(Number('5')) && ['+', '-', 'x', '/'].includes(first ?? "")

    if (!firstOperation(first ?? ""))
      calcValue = String(first) + calcValue;

    if (!lastOperation(last ?? ""))
      calcValue = calcValue + String(last);

    let value = Number(calcValue);

    if (last)
      switch (last) {
        case '%':
          value = (this.reference?.value ?? 0) * value / 100
          break;
        default:

      }

    switch (first) {
      case '+':
        currentValue = (this.reference?.value ?? 0) + value;
        break;
      case '-':
        currentValue = (this.reference?.value ?? 0) - value;
        break;
      case 'x':
        currentValue = (this.reference?.value ?? 0) * value;
        break;
      case '/':
        currentValue = (this.reference?.value ?? 0) / value;
        break;
      default:
        currentValue = lastOperation(last ?? "") ? value : this.reference?.value ?? 0;
    }

    return currentValue;
  };

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  unit?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  calc?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  required?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  debit!: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  order?: number;

  @ForeignKey(() => TransactionType)
  referenceTypeId?: string;

  @BelongsTo(() => TransactionType)
  reference?: TransactionType;


  @HasMany(() => Paypack)
  paypacks?: Paypack[];

}