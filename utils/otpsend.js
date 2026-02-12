const nodemailer = require('nodemailer');

const otpsend = async (email, otp) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'varunvaghasiya72@gmail.com',
            pass: 'eeoyzflrejtmszkz',
        }
    });

    const mailOptions = {
        from: 'varunvaghasiya72@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP is ${otp}`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = otpsend;
