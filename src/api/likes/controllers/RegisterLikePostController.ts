import { Request, Response } from 'express';
import { RegisterLikeService } from '../../../modules/likes/application/RegisterLikeService';

export class RegisterLikePostControler {
  constructor(private registerLikeService: RegisterLikeService) {}
  async run(req: Request, res: Response) {
    try {
      const { fromUserId, toUserID } = req.body;
      await this.registerLikeService.execute(fromUserId, toUserID);
      res.status(201).send();
    } catch (err: any) {
      res.status(500).json({ errorMessage: err.message });
    }
  }
}
