import { Request, Response } from 'express';
import { UserDeleter } from '../../../modules/users/application/UserDeleter';

export class UserDeleterCrontroller {
  constructor(private userDeleter: UserDeleter) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      await this.userDeleter.run(req.params.id);
      res.status(200).end();
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
