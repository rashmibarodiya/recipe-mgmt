


import jwt from"jsonwebtoken"
import { User } from "@repo/db/src/index"
import { connect } from "@repo/db/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connect();
    const secret = process.env.SECRET!
    // console.log(secret)
    // console.log(process.env.MONG!)
    try {

        const body = await request.json()
        const { username, password, email } = body

console.log(body)
        if (!username || !password || !email) {
            return NextResponse.json({
                msg: "Username, password, and email are required"
            }, { status: 400 });
        }

        const user = await User.findOne({ username });
        if (user) {
            return NextResponse.json({
                msg: "User already exists"
            }, { status: 500 }) 


        } else {

            const newUser = new User({
                username,
                password,
                email
            });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
            return NextResponse.json({
                msg: "User created successfully",
                token
            }, { status: 200 })
        }



    } catch (e) {
        console.error('Error during user signup:', e); // Log the error
        return NextResponse.json({
            msg: "Internal server error"
        }, { status: 500 })
   }


   
}