import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail=async(to:string,html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.", // gmail host
        port: 587, // gmail port
        secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
        auth: {
          user: "tawhidulislam3482@gmail.com", 
          pass: "jmey idye noed ijgr", // app password gmail
        },
      });


       await transporter.sendMail({
        from: 'tawhidulislma3482@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password within 10 mins!", // Subject line
        text: "Change your password", // plain text body
        html  // html body
      });
}