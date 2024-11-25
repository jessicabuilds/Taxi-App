import { Router } from 'express';
import { RideEstimateController } from '../controllers/ride-estimate.controller';

const router = Router();

router.post('/estimate', async (req, res) => {
  await RideEstimateController.createRide(req, res);
});

export default router;
