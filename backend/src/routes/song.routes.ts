import { Router } from 'express';
import {
  createSong,
  deleteSong,
  getSong,
  listSongs,
  updateSong,
} from '../controllers/song.controller.js';

const router = Router();

router.route('/').get(listSongs).post(createSong);
router.route('/:id').get(getSong).put(updateSong).delete(deleteSong);

export default router;