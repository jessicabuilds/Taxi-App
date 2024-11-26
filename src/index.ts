import express from 'express';
import rideRoutes from './routes/ride-estimate.routes';

const app = express();
app.use(express.json());

app.use('/ride', rideRoutes);

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//docker-compose down --volumes --remove-orphans
// docker-compose build --no-cache
// docker-compose up
