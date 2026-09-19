// Generates an IPPSCC-compatible scrypt password hash for seeding the
// Supabase `admins` table. No dependencies. Usage:
//   node scripts/hash-password.mjs "Your-Strong-Password"
import { scryptSync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "Your-Strong-Password"');
  process.exit(1);
}
const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(
  `scrypt$16384$8$1$${salt.toString("base64url")}$${hash.toString("base64url")}`
);
