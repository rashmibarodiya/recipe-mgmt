
import jwt from "jsonwebtoken"



const secret = process.env.SECRET!;
export const authenticat = (req : Request)=>{
    const fulltoken = req.headers.get('authorization')
    if(!fulltoken) {
        return { authenticated: false, message: 'No token provided' };
    }
    const token = fulltoken[1]

    try{
            const decoded = jwt.verify(token, secret)
            return { authenticated: true,user: decoded };
    }catch(e){
        console.error('Error during user auth middleware:', e);
        return { authenticated: false, message: 'Invalid token' };
    }
}