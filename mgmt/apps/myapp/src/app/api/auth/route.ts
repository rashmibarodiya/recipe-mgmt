import jwt from "jsonwebtoken";

// Ensure to replace 'your-secret-key' with a real secret key
const secret = process.env.SECRET || 'your-secret-key';

export const authenticate = (req: Request) => {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader) {
        return { authenticated: false, message: 'No token provided' };
    }
    
    // Extract token from 'Bearer <token>' format
    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, secret);
        return { authenticated: true, user: decoded };
    } catch (e) {
        console.error('Error during user auth middleware:', e);
        return { authenticated: false, message: 'Invalid token' };
    }
}
