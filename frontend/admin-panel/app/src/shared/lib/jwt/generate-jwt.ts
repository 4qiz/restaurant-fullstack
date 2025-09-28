import jwt from "jsonwebtoken";

interface JwtParams {
  name?: string | null;
  email?: string | null;
  sub?: string | null;
  id: string;
  role: string;
}

export const generateJwt = (params: JwtParams): string => {
  const secretKey = process.env.NEXTAUTH_SECRET;
  if (!secretKey) {
    throw new Error("NEXTAUTH_SECRET undefined");
  }

  const issuer = process.env.JWT_ISSUER;
  if (!issuer) {
    throw new Error("JWT_ISSUER undefined");
  }

  const audience = process.env.JWT_AUDIENCE;
  if (!audience) {
    throw new Error("JWT_AUDIENCE undefined");
  }

  const payload = {
    name: params.name,
    email: params.email,
    id: params.id,
    sub: params.id,
    role: params.role,
    jti: crypto.randomUUID(), // Generate a unique token ID if not provided
  };

  const options: jwt.SignOptions = {
    algorithm: "HS256",
    issuer: issuer, // Set default issuer
    audience: audience, // Set default audience
    expiresIn: "7d", // Default expiration time
  };

  return jwt.sign(payload, secretKey, options);
};
