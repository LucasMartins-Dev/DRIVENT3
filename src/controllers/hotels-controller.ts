import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Hotel } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    await hotelsService.verification(userId);
    const hotels: Hotel[] = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name !== 'NotFoundError' && error.name !== 'PaymentRequired') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    next(error);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { hotelId } = req.params;
  try {
    await hotelsService.verification(userId);
    const hotel: Hotel = await hotelsService.getHotelsById(Number(hotelId));
    res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name !== 'NotFoundError' && error.name !== 'PaymentRequired') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    next(error);
  }
}
