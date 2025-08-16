// Server-side password utilities
// This file should only be imported in server-side code

import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateSalt(): string {
  return bcrypt.genSaltSync(12);
}