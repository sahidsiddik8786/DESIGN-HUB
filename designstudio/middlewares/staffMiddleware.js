// staffMiddleware.js
import JWT from 'jsonwebtoken';
import StaffModel from '../models/staffModel.js';

export const requireStaffSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
       
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).send({
                success: false,
                message: 'Authorization token not provided or invalid',
            });
        }
        const tokenWithoutBearer = token.split(' ')[1];

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.staff = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'Invalid token',
        });
    }
};


// Middleware to verify JWT token
export const verifyTokenMiddleware = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Missing or invalid token",
        });
      }
      const token = authHeader.split(' ')[1];
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
  };
  

export const isAuthorized = async (req, res, next) => {
    try {
        const { _id, role } = req.staff;
        const user = await StaffModel.findById(_id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        if (role !== '1' && role !== '2') {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized access',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in authorization middleware',
        });
    }
};
