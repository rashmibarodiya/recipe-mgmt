// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'your-secret-key';

export default function authenticate(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader) {
    return { authenticated: false, message: 'No token provided' };
  }
  
  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, secret);
    return { authenticated: true, user: decoded };
  } catch (e) {
    console.error('Error during user auth middleware:', e);
    return { authenticated: false, message: 'Invalid token' };
  }
}
