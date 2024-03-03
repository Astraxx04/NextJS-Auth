import { connect } from "@/database/dbConfig";
import Users from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await Users.findOne({ email });
        if(!user) {
            return NextResponse.json({ error: "User does not exists!!"}, { status: 400 });
        }

        const valiPassword = await bcryptjs.compare(password, user.password);

        if(!valiPassword) {
            return NextResponse.json({ error: "Incorrect Password!!"}, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, { expiresIn: "1hr" });

        const response = NextResponse.json({
            message: "Login Successful!",
            success: true
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
        
    } catch(error: any){
        return NextResponse.json({  error: error.message  }, { status: 500 });
    }
};