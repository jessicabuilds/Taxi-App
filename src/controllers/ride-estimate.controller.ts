import { Request, Response } from 'express';
import { RideEstimateService } from '../services/ride-estimate.service';

export class RideEstimateController {
  static async createRide(req: Request, res: Response): Promise<Response> {
    try {
      const { origin, destination, customer_id } = req.body;

      if (!customer_id || typeof customer_id !== 'number') {
        return res.status(400).json({
          success: false,
          error:
            'O parâmetro "customer_id" é obrigatório e deve ser um número.',
        });
      }

      const rideEstimate = await RideEstimateService.getRideEstimate(
        origin,
        destination,
      );

      const drivers = await RideEstimateService.availableDrivers(
        rideEstimate.distance,
      );

      const driversWithValues = await Promise.all(
        drivers.map(async (driver) => ({
          ...driver,
          value: await RideEstimateService.calculateValue(
            rideEstimate.distance,
            driver.rate_per_km,
          ),
        })),
      );

      return res.json({
        success: true,
        origin: rideEstimate.origin,
        destination: rideEstimate.destination,
        distance: rideEstimate.distance,
        duration: rideEstimate.duration,
        options: driversWithValues.map((driver) => {
          const { rate_per_km, ...driverDetails } = driver;
          return driverDetails;
        }),
        routeResponse: rideEstimate.routeResponse,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error_code: 'INVALID_DATA',
        error_description:
          'Os dados fornecidos no corpo da requisição são inválidos',
      });
    }
  }
}
