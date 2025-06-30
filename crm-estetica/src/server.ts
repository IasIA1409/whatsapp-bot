import express from 'express';
import leadRoutes from '../apps/api/src/routes/leadRoutes';

const app = express();
app.use('/leads', leadRoutes);
