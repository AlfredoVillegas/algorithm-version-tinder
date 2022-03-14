import { Request, Response } from 'express';
import { UserRegister } from '../../../modules/users/application/UserRegister';

export class UserRegisterPostController {
  constructor(private userRegister: UserRegister) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, email, password } = req.body;
      await this.userRegister.run({ id, name, email, password });
      res.status(201).json({ data: { id, name, email } });
    } catch (err: any) {
      res.status(400).json({
        errorMessage: err.message
      });
    }
  }
}
