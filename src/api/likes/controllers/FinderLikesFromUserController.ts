import { Request, Response } from 'express';
import { FinderLikesByUserServices } from '../../../modules/likes/application/FinderLikesFromUserServices';

export class FinderLikesFromUserController {
  constructor(private finderLikesService: FinderLikesByUserServices) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const likesInDb = await this.finderLikesService.execute(userId);
      const likesResponse = likesInDb.map(like => {
        return { id: like.id.value, toUser: like.toUser.value, createdAt: like.createdAt.toString() };
      });
      res.status(200).json({ data: likesResponse });
    } catch (err: any) {
      res.status(500).json({ errorMessage: err.message });
    }
  }
}
