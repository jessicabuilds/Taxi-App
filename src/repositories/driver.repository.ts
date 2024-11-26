import pool from '../config/db';
import { Driver } from '../interfaces/driver.interface';

export class DriverRepository {
  static async getAllDrivers(): Promise<Driver[]> {
    const query = 'SELECT * FROM drivers';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getDriverById(id: string): Promise<Driver | null> {
    const query = 'SELECT * FROM drivers WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async addDriver(driver: Driver): Promise<void> {
    const query = `
      INSERT INTO drivers (id, name, car, rating, description, feedback, rate_per_km, min_km)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [
      driver.id,
      driver.name,
      driver.car,
      driver.rating,
      driver.description,
      JSON.stringify(driver.feedback),
      driver.rate_per_km,
      driver.min_km,
    ];
    await pool.query(query, values);
  }

  static async updateDriver(
    id: string,
    updatedData: Partial<Driver>,
  ): Promise<void> {
    const fields = Object.keys(updatedData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = [id, ...Object.values(updatedData)];
    const query = `UPDATE drivers SET ${fields} WHERE id = $1`;
    await pool.query(query, values);
  }

  static async deleteDriver(id: string): Promise<void> {
    const query = 'DELETE FROM drivers WHERE id = $1';
    await pool.query(query, [id]);
  }
}
