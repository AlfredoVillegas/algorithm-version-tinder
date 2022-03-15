import { Request, Response } from 'express';
import { FinderMatchesByUser } from '../../../modules/matches/application/FinderMatchesByUser';

export class FinderMatchesByUserController {
  constructor(private finderMatchesByUser: FinderMatchesByUser) {}

  async run(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const matches = await this.finderMatchesByUser.execute(userId);

      const matchesResponse = matches.map(match => {
        return {
          id: match.id.value,
          personOne: match.personOne.value,
          personTwo: match.personTwo.value,
          createdAt: match.createdAt.toString()
        };
      });
      res.status(200).json({ data: matchesResponse });
    } catch (err: any) {
      res.status(500).json({ errorMessage: err.message });
    }
  }
}
