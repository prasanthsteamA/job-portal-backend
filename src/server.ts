import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { AppDataSource } from './config/database';
import jobRoutes from './routes/job.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/authMiddleware';
import { rateLimit } from "express-rate-limit"

const app = express();
const limiter = rateLimit({
   windowMs : 60*1000,
   max : 10,
   message: "Too Many request"
})
app.use(limiter)

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/jobs', authenticateToken as express.RequestHandler, jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
AppDataSource.initialize().then(() => {
  console.log('Database Connected ✅');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));

export default app;
