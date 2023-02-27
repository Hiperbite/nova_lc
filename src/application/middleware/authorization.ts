import { Request, Response, NextFunction } from "express";

const jwt = require("express-jwt");
const { secret } = require("config.json");

const authorization = async (roles: string[] = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authorize based on user role
    (req: Request, res: Response, next: NextFunction) => {
      const userRoles: string[] = res.locals.user.roles;
      for (let role in roles) {
        if (roles.length && !userRoles.includes(role)) {
          // user's role is not authorized
          return res.status(401).json({ message: "Unauthorized" });
        }
      }
      // authentication and authorization successful
      next();
    },
  ];
};
export default authorization;
