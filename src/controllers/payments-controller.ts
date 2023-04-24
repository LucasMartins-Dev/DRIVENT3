import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Payment } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { cannotEnrollBeforeStartDateError } from '@/errors';
import { PaymentData, Ticket } from '@/protocols';

export async function getPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;
  try {
    if (!ticketId) {
      throw cannotEnrollBeforeStartDateError();
    }
    const ticket: Ticket = await paymentsService.findTicketById(ticketId);
    await paymentsService.findTicketByUserId(userId, ticket);
    const payment: Payment = await paymentsService.getPayments(ticketId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId, cardData } = req.body as PaymentData;
  const { userId } = req;
  try {
    const ticket: Ticket = await paymentsService.findTicketById(ticketId);
    await paymentsService.findTicketByUserId(userId, ticket);
    const payment: Payment = await paymentsService.postPayments({ ticketId, cardData });
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
