import express from 'express';
import rideRoutes from './routes/ride.routes';

const app = express();
app.use(express.json());

app.use('/ride', rideRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
