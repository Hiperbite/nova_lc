import { createPaypackSchema, updatePaypackSchema } from './payroll/paypack.schema';
import { CreateStudentInput, createStudentSchema, UpdateStudentInput, updateStudentSchema } from './student/student.schema';
import { createTransactionTypeSchema, updateTransactionTypeSchema } from './payroll/transaction-type.schema';
import { CreateSessionInput, createSessionSchema } from "./common/auth.schema";
import {
    CreateUserInput,
    ResetPasswordInput,
    ForgotPasswordInput,
    VerifyUserInput,

    createUserSchema,
    forgotPasswordSchema,
    verifyUserSchema,
    resetPasswordSchema

} from "./common/user.schema";

export {
    CreateSessionInput,
    createSessionSchema,
    CreateUserInput,
    ResetPasswordInput,
    ForgotPasswordInput,
    VerifyUserInput,

    createUserSchema,
    forgotPasswordSchema,
    verifyUserSchema,
    resetPasswordSchema,

    CreateStudentInput,
    createStudentSchema,
    UpdateStudentInput,
    updateStudentSchema,

    createTransactionTypeSchema,
    updateTransactionTypeSchema,

    createPaypackSchema,
    updatePaypackSchema
}