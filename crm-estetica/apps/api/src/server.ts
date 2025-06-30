import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import protectedRoutes from './routes/protectedRoutes';
import appointmentRoutes from './routes/appointmentRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/leads', leadRoutes);
app.use('/protected', protectedRoutes);
app.use('/appointments', appointmentRoutes);

app.get('/', (req, res) => {
  res.send('CRM backend funcionando!');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
import dashboardRoutes from './routes/dashboardRoutes';
app.use('/dashboard', dashboardRoutes);
