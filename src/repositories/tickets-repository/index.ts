import { TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { Ticket } from '@/protocols';

async function getTicketsType(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findEnrollmentByUserId(userId: number): Promise<{ id: number }> {
  return prisma.enrollment.findFirst({
    select: {
      id: true,
    },
    where: {
      userId,
    },
  });
}

async function postTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket> {
  const ticket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
  });
  return getTicketByIds(ticket.id, 0);
}
async function getTicketByIds(id: number, enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      OR: [
        {
          id,
        },
        {
          enrollmentId,
        },
      ],
    },
  });
}

const ticketsRepository = {
  getTicketsType,
  postTicket,
  findEnrollmentByUserId,
  getTicketByIds,
};

export default ticketsRepository;
