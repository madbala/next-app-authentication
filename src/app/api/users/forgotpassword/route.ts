import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect()
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { userEmail: email } = reqBody


        const user = await User.findOne({ email })

        if (user) {
            // send reset email

            await sendEmail({ email, emailType: 'RESET', userId: user._id })
            return NextResponse.json({ message: "Forgot password", success: true })

        }
        return NextResponse.json({ error: "User does not exists" }, { status: 400 })
    } catch (error: any) {
        throw new Error(error?.message)

    }


}