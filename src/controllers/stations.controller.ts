import { Request, Response, NextFunction } from "express";
import { injectable } from 'tsyringe';

@injectable()
export class StationsController {
    public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).json({ message: 'Hello world' });
        } catch (error) {
            next(error);
        }
    };
}
