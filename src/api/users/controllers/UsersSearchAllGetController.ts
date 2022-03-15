import { Request, Response } from 'express';
import { UserSearchAll } from '../../../modules/users/application/UsersSearchAll';

export class UsersSearchAllGetController {
  constructor(private searchAll: UserSearchAll) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.searchAll.run();
      const userResponse = users.map(user => {
        return { id: user.id.value, name: user.name.value, email: user.email.value };
      });
      res.status(200).json({ data: userResponse });
    } catch (err: any) {
      res.status(404).json({ errorMessage: err.message });
    }
  }
}
