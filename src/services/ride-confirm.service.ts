import { DriverRepository } from '../repositories/driver.repository';
import { RideEstimateController } from '../controllers/ride-estimate.controller';

export class RideConfirmService {
  private static validateConfirmParameters(
    customer_id: number,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    value: number,
  ) {
    if (!customer_id || !origin || !destination || !distance || !duration) {
      throw new Error('Todos os parâmetros devem ser fornecidos.');
    }

    if (origin === destination) {
      throw new Error(
        'Os valores de "origin" e "destination" não podem ser iguais.',
      );
    }
  }

  async validateDriver(driver.id: number) { 
    if (!driver.id) {
      throw new Error('O motorista deve ser informado.');
    }

    if (!driver.id || !driver.name) {
      throw new Error('O motorista deve conter um ID e um nome.');
    }

    const driverExists = await DriverRepository.getDriverById(driver.id);
    if (!driverExists) {
      throw new Error('Motorista inválido.');
    }

    const validateMinKm = (distance: RideEstimateController) => (distance ) >= driver.min_km; 
  }
}
