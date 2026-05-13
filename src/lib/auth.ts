import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'bsms-resource-share-secret-key-2024';
export const SESSION_COOKIE = 'rs_session';

export interface UserPayload {
  id: number;
  username: string;   // maps to DB `email` column
  displayName: string; // maps to DB `name` column
  role: 'admin' | 'teacher' | 'student' | 'pending';
}

export function signToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: Request): UserPayload | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  const map: Record<string, string> = {};
  cookieHeader.split(';').forEach(part => {
    const [k, ...v] = part.trim().split('=');
    map[k.trim()] = decodeURIComponent(v.join('='));
  });
  const token = map[SESSION_COOKIE];
  if (!token) return null;
  return verifyToken(token);
}
