
import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16; // 16 bytes for AES

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;

if (!ENCRYPTION_SECRET) {
  throw new Error("ENCRYPTION_SECRET is missing from environment variables");
}

// 🔐 Derive a 32-byte key from your secret
const key = crypto.scryptSync(ENCRYPTION_SECRET, "salt", 32);

export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(data) {
  const [ivHex, encryptedHex] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString("utf8");
}
