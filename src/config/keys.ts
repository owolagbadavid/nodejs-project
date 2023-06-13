import dotenv from 'dotenv';
dotenv.config();
import * as dev from './dev';
import * as prod from './prod';
import * as ci from './ci';

export const getExport = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    case 'ci':
      return ci;
    default:
      return dev;
  }
};

export default getExport;