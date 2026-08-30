import { Router } from 'express';
import { getFacets, getStats } from '../controllers/stats.controller.js';

const router = Router();

router.get('/', getStats);
router.get('/facets', getFacets);

export default router;