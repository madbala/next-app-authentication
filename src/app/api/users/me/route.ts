import { getDatafromToken } from "@/helpers/utils";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function GET(request:NextRequest) {
    try {

        const userId = await getDatafromToken(request)
        const user = await User.findOne({_id:userId}).select('-password')
        return NextResponse.json({message:"user found",data:user})


    } catch (error:any) {
        throw new Error(error.message)
        
    }
}