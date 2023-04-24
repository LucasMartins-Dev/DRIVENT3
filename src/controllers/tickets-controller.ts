import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { TicketType } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsTypeService from '@/services/tickets-service';
import { Ticket, TicketTypeId } from '@/protocols';

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsType: TicketType[] = await ticketsTypeService.getTicketsType();
    return res.status(httpStatus.OK).send(ticketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postCreateTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketTypeId } = req.body as TicketTypeId;
  const { userId } = req;
  try {
    const ticketCreated: Ticket = await ticketsTypeService.postCreateTicket(ticketTypeId, userId);
    res.status(httpStatus.CREATED).send(ticketCreated);
  } catch (error) {
    next(error);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const ticket: Ticket = await ticketsTypeService.getTicket(userId);
    res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    next(error);
  }
}
