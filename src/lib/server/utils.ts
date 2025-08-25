import { randomBytes } from "crypto";

export function generateRandomHex(): string {
  return randomBytes(3).toString('hex');
}
