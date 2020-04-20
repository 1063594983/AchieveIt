import nodeMailer from 'nodemailer';

interface EmailOption {
  to: string,
  subject: string,
  text?: string,
  html?: string
}

const transporter = nodeMailer.createTransport({
  pool: true,
    service: '126',
    port: 465,
    secure: true,
    auth: {
        user: 'xuanlinzou@126.com',
        pass: 'VDNLVYBEZWLJXVEH'
    }
});

const email = {
   /*sendEmail: async (option: EmailOption, callback: Function) => {
     transporter.sendMail({...option, from: "xuanlinzou@126.com"}, (err, info) => {
       callback(err, info);
     })
   }*/
  sendEmail: async (option: EmailOption, callback: Function) => {}
}

const emailUtil = {
  
}

export default email;
// let mailOptions = {
//     from: 'xuanlinzou@126.com', // sender address
//     to: '1063594983@qq.com', // list of receivers
//     subject: 'Hello', // Subject line
//     // 发送text或者html格式
//     // text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>' // html body
//   };
  
//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
//   });