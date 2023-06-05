import { clearHash } from "../services/cache";
import { Request, Response, NextFunction  } from "express";

export default async (req: Request, res: Response, next: {(err?: Error): Promise<void>}) => {
    await next(); 

    clearHash((req.user as any).id);


}