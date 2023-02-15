import { Router } from "express";
import userRoutes from "./common/user.routes";
import authRoutes from "./common/auth.routes";
import employeeRoutes from "./employee/employee.routes";
import payrollRoutes from "./payroll/";

const routes = Router();

routes.use('/users',userRoutes) 
routes.use('/auth',authRoutes) 

routes.use('/employees',employeeRoutes) 
routes.use('/payrolls',payrollRoutes) 

export default routes;