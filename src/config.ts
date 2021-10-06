import { config } from 'dotenv';
config();

export const jwt = {
  secret: process.env.JWT_SECRET || 'unifafibe',
  expiresIn: process.env.EXPIRES_IN,
};
