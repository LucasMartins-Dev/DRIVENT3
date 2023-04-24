import Joi from 'joi';
import { PaymentData } from '@/protocols';

export const paymentDataSchema = Joi.object<PaymentData>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().integer().required(),
    name: Joi.string().required(),
    expirationDate: Date,
    cvv: Joi.number().integer().required(),
  }).required(),
});
