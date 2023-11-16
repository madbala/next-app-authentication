import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail= async ({email,emailType,userId}:any)=>{

    try {
        // create a token
        const hasedToken =await bcryptjs.hash(userId.toString(),10)

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hasedToken,verifyTokenExpiry:Date.now()+3600000})
        }else if(emailType==="REST"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hasedToken,forgotPasswordTokenExpiry:Date.now()+3600000})
        }
        
// add credentials to .env file
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "5fed325777dfca",
              pass: "f4f55239c8dbef"
            }
          });


          const mailOptions ={
            from:'rbalaguru013@gmail.com',
            to:email,
            subject:emailType ==='VERIFY'?"Verify your email":"Reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType==='VERIFY'?"Verify your email":"Reset your password"} <br /> or <br/> copy and paste the below URL in your browser. <br />${process.env.DOMAIN}/verifyemail?token=${hasedToken} </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
        
    }


}