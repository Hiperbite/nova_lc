import { Router } from "express";
import commonRoutes from "./common/common.routes";
import userRoutes from "./common/user.routes";
import authRoutes from "./common/auth.routes";
import trackRoutes from "./common/track.routes";
import addressRoutes from "./common/address.routes";
import staffRoutes from "./staff/staff.routes";

import studentRoutes from "./student/student.routes";
import enrollmentRoutes from "./student/enrollment.routes";

import periodRoutes from "./academic/period.routes";
import classRoomRoutes from "./academic/classe-room.routes";
import classRoutes from "./academic/classe.routes";

const routes = Router();

routes.use('/users',userRoutes) 
routes.use('/auth',authRoutes) 
routes.use('/tracks',trackRoutes) 
routes.use('/commons/address',addressRoutes) 

routes.use('/students/enrollments',enrollmentRoutes) 
routes.use('/students',studentRoutes) 
routes.use('/staffs',staffRoutes) 

routes.use('/academics/periods',periodRoutes) 
routes.use('/academics/class-rooms',classRoomRoutes) 

routes.use('/academics/class',classRoutes) 

routes.use(commonRoutes) 

export default routes;