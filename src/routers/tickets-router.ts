import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsType, postCreateTicket, getTicket } from '@/controllers';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/types', getTicketsType);
ticketsRouter.get('/', getTicket);
ticketsRouter.post('/', validateBody(createTicketSchema), postCreateTicket);

export { ticketsRouter };
