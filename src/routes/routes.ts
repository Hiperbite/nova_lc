import { Router } from "express";
import userRoutes from "./common/user.routes";
import authRoutes from "./common/auth.routes";
import studentRoutes from "./student/student.routes";
import payrollRoutes from "./payroll/";

const routes = Router();

routes.use('/users',userRoutes) 
routes.use('/auth',authRoutes) 

routes.use('/students',studentRoutes) 
routes.use('/payrolls',payrollRoutes) 

export default routes;