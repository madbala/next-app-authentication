import { getDatafromToken } from "@/helpers/utils";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, newPassword } = reqBody

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedNewPassword = await bcryptjs.hash(newPassword, salt)


        await User.findByIdAndUpdate(user._id, { password: hashedNewPassword })



        return NextResponse.json({ user, message: "Reset Successfull" }, { status: 200 })

    } catch (error: any) {
        throw new Error(error)

    }
}