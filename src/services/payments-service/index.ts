import { Payment } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import { PaymentData, Ticket } from '@/protocols';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentsRepository from '@/repositories/payments-repository';

async function findTicketById(ticketId: number): Promise<Ticket> {
  const ticketIdExist = await ticketsRepository.getTicketByIds(ticketId, 0);
  if (!ticketIdExist) {
    throw notFoundError();
  }
  return ticketIdExist;
}

async function findTicketByUserId(userId: number, ticket: Ticket): Promise<void> {
  const enrollmentId = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) {
    throw notFoundError();
  }
  if (ticket.enrollmentId !== enrollmentId.id) {
    throw unauthorizedError();
  }
}

async function getPayments(ticketId: number): Promise<Payment> {
  const payment = await paymentsRepository.getPayments(ticketId);
  return payment;
}

async function postPayments(paymentData: PaymentData): Promise<Payment> {
  const payment = await paymentsRepository.postPayments(paymentData);
  return payment;
}

const ticketsService = {
  findTicketById,
  findTicketByUserId,
  getPayments,
  postPayments,
};

export default ticketsService;
