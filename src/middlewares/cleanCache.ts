import { clearHash } from '../services/cache';
import { Request, Response, NextFunction  } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
	await next(); 

	clearHash(req.user.id);


};