import { createClassSchema, updateClassSchema } from './academic/classe.schema';

import { CreateStudentInput, createStudentSchema, UpdateStudentInput, updateStudentSchema } from './student/student.schema';
import { CreateStaffInput, createStaffSchema, UpdateStaffInput, updateStaffSchema } from './staff/staff.schema';

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
import { createPeriodSchema, updatePeriodSchema } from './academic/period.schema';
import { createEnrollmentClassSchema, updateEnrollmentClassSchema } from './student/enrollment.schema';

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

    createClassSchema,
    updateClassSchema,

    CreateStaffInput, createStaffSchema, UpdateStaffInput, updateStaffSchema,

    updatePeriodSchema,
    createPeriodSchema,

    createEnrollmentClassSchema,
    updateEnrollmentClassSchema
} 
