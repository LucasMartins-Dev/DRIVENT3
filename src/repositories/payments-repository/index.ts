import { Payment } from '@prisma/client';
import { prisma } from '@/config';
import { PaymentData } from '@/protocols';

async function getPayments(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function postPayments(paymentData: PaymentData): Promise<Payment> {
  const ticket = await prisma.ticket.update({
    where: {
      id: paymentData.ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
  const ticketType = await prisma.ticketType.findFirst({
    where: {
      id: ticket.ticketTypeId,
    },
  });
  return await prisma.payment.create({
    data: {
      ticketId: paymentData.ticketId,
      cardIssuer: paymentData.cardData.issuer,
      cardLastDigits: paymentData.cardData.number.toString().slice(-4),
      value: ticketType.price,
    },
  });
}

const paymentsRepository = {
  getPayments,
  postPayments,
};

export default paymentsRepository;
