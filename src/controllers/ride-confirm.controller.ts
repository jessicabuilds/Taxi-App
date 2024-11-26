import { Request, Response } from 'express';

export class RideConfirmController {
  static async confirmRide(req: Request, res: Response): Promise<Response> {
    try { 
      const { customer_id, origin, destination, distance, duration, driver_id, driver_name, value } = req.body;

      




    }
      