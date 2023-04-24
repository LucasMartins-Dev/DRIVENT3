import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPayments, postPayments } from '@/controllers';
import { paymentDataSchema } from '@/schemas';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', getPayments);
paymentsRouter.post('/process', validateBody(paymentDataSchema), postPayments);

export { paymentsRouter };
