import { Hotel } from '@prisma/client';
import { prisma } from '@/config';
import { HotelById } from '@/protocols';

async function getHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function getHotelById(id: number): Promise<HotelById> {
  return prisma.hotel.findUnique({
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          hotelId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    where: {
      id,
    },
  });
}

const hotelsRepository = {
  getHotels,
  getHotelById,
};

export default hotelsRepository;
