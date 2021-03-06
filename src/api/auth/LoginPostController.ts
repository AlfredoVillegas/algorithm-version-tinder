import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEmail } from '../../modules/users/domain/UserEmail';
import { UserSchema } from '../../modules/users/infrastructure/persistence/typeorm/UserSchema';

export async function loginPostController(req: Request, res: Response): Promise<void> {
  try {
    const userRepository = getConnection().getRepository(UserSchema);

    const { userEmail, password } = req.body;
    const email = new UserEmail(userEmail);

    const user = await userRepository.findOne({ email: email });

    const isPasswordCorrect = user ? await bcrypt.compare(password, user.password.value) : false;
    if (!isPasswordCorrect) {
      res.status(401).json({ errorMessage: 'invalid user or password' });
      return;
    }

    const userForToken = {
      id: user?.id
    };

    const token = jwt.sign(userForToken, process.env.SECRET || 'Dev');

    res.send({ name: user?.name, token: token });
  } catch (err: any) {
    res.status(500).json({ errorMessage: err.message });
  }
}
