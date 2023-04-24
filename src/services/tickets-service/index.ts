import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import { Ticket } from '@/protocols';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketsType(): Promise<TicketType[]> {
  const ticketsType: TicketType[] = await ticketsRepository.getTicketsType();
  return ticketsType;
}

async function postCreateTicket(ticketTypeId: number, userId: number): Promise<Ticket> {
  const enrollmentId = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) {
    throw notFoundError();
  }
  const ticketCreated = await ticketsRepository.postTicket(ticketTypeId, enrollmentId.id);
  return ticketCreated;
}

async function getTicket(userId: number): Promise<Ticket> {
  const enrollmentId = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.getTicketByIds(0, enrollmentId.id);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

const ticketsService = {
  getTicketsType,
  postCreateTicket,
  getTicket,
};

export default ticketsService;
