import nodemailer from "nodemailer";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";


export const sendEmail = async ({email, emailType , userId} : any )=> {
    try {
        const hashedtoken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {await User.findByIdAndUpdate(userId, {
            verifyToken: hashedtoken,verifytokenExpiry: Date.now() + 3600000, // 1 hour
        })
    }

    else if (emailType === "RESET") {await User.findByIdAndUpdate(userId,{forgotpasswordToken: hashedtoken,forgotpasswordtokenExpiry: Date.now() + 3600000, // 1 hour
    })
}
     var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3fd364695517df",
              pass: "7383d58fd399cf"
              //TODO: add these credentials to .env file
            }
          });

           const mailOptions = {
            from: 'kartikjagdale0511@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
            </p>`
        }
    } catch (error :any ) {
         throw new Error(error.message);
    }
}