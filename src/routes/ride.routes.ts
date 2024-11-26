import { Router } from 'express';
import { RideEstimateController } from '../controllers/ride-estimate.controller';
import { RideConfirmController } from '../controllers/ride-confirm.controller';

const router = Router();
const rideConfirmController = new RideConfirmController();

router.post('/estimate', async (req, res) => {
  await RideEstimateController.createRide(req, res);
});

router.patch('/confirm', async (req, res) => {
  await rideConfirmController.confirmRide(req, res);
});

export default router;
