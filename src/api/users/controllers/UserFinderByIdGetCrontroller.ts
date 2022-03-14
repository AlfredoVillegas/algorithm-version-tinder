import { Request, Response } from 'express';
import { UserFinderById } from '../../../modules/users/application/UserFinderById';

export class UserFinderGetCrontroller {
  constructor(private userFinder: UserFinderById) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this.userFinder.run(userId);
      const { id, name, email } = user.toPrimitives();
      res.status(200).json({ data: { id, name, email } });
    } catch (err: any) {
      res.status(404).json({ errorMessage: err.message });
    }
  }
}
