

import { User } from "@repo/db/src/index";
import { connect } from "@repo/db/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
    await connect();
    try {
        // Add logging to see if the body is received correctly
        console.log("Received request:", request);

        const body = await request.json();
        console.log("Parsed JSON body:", body);

        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({
                msg: "Username, Email, and password are required"
            }, { status: 400 });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({
                msg: "Invalid username, email, or password"
            }, { status: 401 });
        } else if (user.password !== password) {
            return NextResponse.json({
                msg: "Invalid password"
            }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({
            token, msg: "User login successful"
        });

    } catch (error) {
        console.error('Error during user login:', error);
        return NextResponse.json({
            msg: "Internal server error"
        }, { status: 500 });
    }
}
