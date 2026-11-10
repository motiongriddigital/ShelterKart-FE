import { forward } from '@/app/api/_lib/backend';

// Every admin call (stats, users, bans, desks ...). The Express server checks the admin login it is sent.
export const GET = forward;
export const POST = forward;
