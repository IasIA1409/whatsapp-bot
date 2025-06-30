import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await authService.register(name, email, password);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  },
};
