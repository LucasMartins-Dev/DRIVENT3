import { Hotel } from '@prisma/client';
import { notFoundError, paymentRequired } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { HotelById } from '@/protocols';

async function verification(userId: number): Promise<void> {
  const enrollmentId = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) throw notFoundError();
  const ticket = await ticketsRepository.getTicketByIds(0, enrollmentId.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequired();
}

async function getHotels(): Promise<Hotel[]> {
  const hotels: Hotel[] = await hotelsRepository.getHotels();
  if (!hotels.length) throw notFoundError();
  return hotels;
}

async function getHotelsById(hotelId: number): Promise<HotelById> {
  const hotel: HotelById = await hotelsRepository.getHotelById(hotelId);
  if (!hotel) throw notFoundError();
  return hotel;
}

const hotelsService = {
  verification,
  getHotels,
  getHotelsById,
};

export default hotelsService;
