import { Router } from "express";
import userRoutes from "./common/user.routes";
import authRoutes from "./common/auth.routes";
import studentRoutes from "./student/student.routes";
import enrollmentRoutes from "./student/enrollment.routes";
import enrollmentConfirmationRoutes from "./student/enrollment-confirmations.routes";

import academicPeriodRoutes from "./academic/academic-period.routes";
import academicShiftRoutes from "./academic/academic-shift.routes";
import classRoomRoutes from "./academic/classy-room.routes";
import classRoutes from "./academic/classy.routes";
import payrollRoutes from "./payroll/";

const routes = Router();

routes.use('/users',userRoutes) 
routes.use('/auth',authRoutes) 

routes.use('/students/enrollments',enrollmentRoutes) 
routes.use('/students/enrollment-confirmations',enrollmentConfirmationRoutes) 
routes.use('/students',studentRoutes) 

routes.use('/academics/periods',academicPeriodRoutes) 
routes.use('/academics/shifts',academicShiftRoutes) 
routes.use('/academics/class-rooms',classRoomRoutes) 

routes.use('/academics/class',classRoutes) 
routes.use('/payrolls',payrollRoutes) 

export default routes;