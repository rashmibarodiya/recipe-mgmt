

import { User } from "@repo/db/src/index";
import { connect } from "@repo/db/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
    await connect();
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({
                msg: "Email and password are required"
            }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user || !password) {
            return NextResponse.json({
                msg: "Invalid email or password"
            }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({
            token
        });

    } catch (error) {
        console.error('Error during user login:', error);
        return NextResponse.json({
            msg: "Internal server error"
        }, { status: 500 });
    }
}
