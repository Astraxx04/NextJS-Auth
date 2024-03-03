import nodemailer from "nodemailer";
import User from "@/models/userSchema";
import bcryptjs from "bcryptjs";

export const sendEmail = async({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "2718527e802922", // ENV File
              pass: "4971d10aa74a36"
            }
        });

        const mailOptions = {
            from: "gagan200254@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
            html: `<p>
                Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
                Or copy paste the link below in your browser.</br>
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            
            </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};