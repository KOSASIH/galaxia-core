import { Secret } from './secret.interface';

const secrets: Secret[] = [
  {
    id: 'galaxia-api-key',
    value: process.env.GALAXIA_API_KEY || 'YOUR_API_KEY',
  },
  {
    id: 'galaxia-api-secret',
    value: process.env.GALAXIA_API_SECRET || 'YOUR_API_SECRET',
  },
  {
    id: 'database-password',
    value: process.env.DATABASE_PASSWORD || 'galaxia123',
  },
];

export default secrets;
