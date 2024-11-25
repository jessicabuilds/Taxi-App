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

      // retornar motoristas disponiveis
      // valor total da corrida

      const routes = await RideEstimateService.getRideEstimate(
        origin,
        destination,
      );

      return res.json({ success: true, routes });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: (error as Error).message,
      });
    }
  }
}
