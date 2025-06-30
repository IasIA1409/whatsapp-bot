import { Request, Response, NextFunction } from 'express';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  if (token !== 'iasmincrm') {
    return res.status(401).json({ error: 'Token is invalid' });
  }

  next();
};
