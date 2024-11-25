import { GoogleMapsService } from './google-maps.service';
import { DirectionsResponse } from '../interfaces/google-maps.interface';

export class RideEstimateService {
  private static validateParameters(origin: any, destination: any): void {
    if (!origin.address || typeof origin.address !== 'string') {
      throw new Error(
        'O parâmetro "origin" é inválido. Deve ser uma string não vazia.',
      );
    }

    if (!destination.address || typeof destination.address !== 'string') {
      throw new Error(
        'O parâmetro "destination" é inválido. Deve ser uma string não vazia.',
      );
    }

    if (origin.address === destination.address) {
      throw new Error(
        'Os valores de "origin" e "destination" não podem ser iguais.',
      );
    }
  }

  static async getRideEstimate(
    origin: any,
    destination: any,
  ): Promise<DirectionsResponse['routes']> {
    this.validateParameters(origin, destination);

    return await GoogleMapsService.getDirections(
      origin.address,
      destination.address,
    );
  }
}
