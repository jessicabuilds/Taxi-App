import { DriverRepository } from '../repositories/driver.repository';
import { GoogleMapsService } from './google-maps.service';

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

  static async getRideEstimate(origin: any, destination: any) {
    this.validateParameters(origin, destination);

    const routeResponse = await GoogleMapsService.getDirections(
      origin.address,
      destination.address,
    );

    const route = routeResponse[0];
    const originCoordinates = route.legs[0].startLocation.latLng;
    const destinationCoordinates = route.legs[0].endLocation.latLng;

    const distance = route.distanceMeters;
    const duration = route.duration;

    return {
      origin: {
        latitude: originCoordinates.latitude,
        longitude: originCoordinates.longitude,
      },
      destination: {
        latitude: destinationCoordinates.latitude,
        longitude: destinationCoordinates.longitude,
      },
      distance,
      duration,
      routeResponse,
    };
  }

  static async availableDrivers(distanceMeters: number) {
    const options = await DriverRepository.getAllDrivers();

    const availableDrivers = options.filter(
      (driver) => distanceMeters >= driver.min_km,
    );

    return availableDrivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.car,
      review: {
        rating: Number(driver.rating),
        comment: driver.feedback,
      },
      rate_per_km: driver.rate_per_km,
    }));
  }

  static async calculateValue(
    distanceMeters: number,
    rate_per_km: number | undefined,
  ) {
    return Number(((distanceMeters / 1000) * Number(rate_per_km)).toFixed(2));
  }
}
