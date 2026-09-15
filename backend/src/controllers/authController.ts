import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ENV } from '../config/env';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class AuthController {
  /**
   * POST /api/auth/register
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Please provide name, email, and password.'
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long.'
        });
        return;
      }

      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'An account with this email already exists.'
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash
      });

      const token = jwt.sign(
        { id: user._id, email: user.email },
        ENV.JWT_SECRET as jwt.Secret,
        { expiresIn: ENV.JWT_EXPIRES_IN as any }
      );

      res.status(201).json({
        success: true,
        data: {
          user: user.toJSON(),
          token
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error registering user.'
      });
    }
  }

  /**
   * POST /api/auth/login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Please provide both email and password.'
        });
        return;
      }

      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
        return;
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        ENV.JWT_SECRET as jwt.Secret,
        { expiresIn: ENV.JWT_EXPIRES_IN as any }
      );

      res.status(200).json({
        success: true,
        data: {
          user: user.toJSON(),
          token
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error during login.'
      });
    }
  }

  /**
   * POST /api/auth/logout
   */
  static async logout(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  }

  /**
   * GET /api/auth/me
   */
  static async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: req.user.toJSON()
      }
    });
  }
}
