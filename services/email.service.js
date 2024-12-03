const nodemailer = require("nodemailer");
require('dotenv').config()

const getWelcomeTemplate = require('../templates/wellcome');

const { USER_GMAIL, USER_GMAIL_PASSWORD, BASE_URL  } = process.env;
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: USER_GMAIL,
        pass: USER_GMAIL_PASSWORD
    }
});

const sendConfirmationEmail = (recipient, token) => {
    const confirmEmailUrl = `${baseUrl}/register/confirm-email?token=${token}`;

    const mailOptions = {
        from: USER_GMAIL,
        to: recipient,
        subject: 'Підтвердження вашої електронної адреси',
        html: getWelcomeTemplate(recipient, confirmEmailUrl)
    };

    return transporter.sendMail(mailOptions)
        .then(info => console.log(`Email sent: ${info.response}`))
        .catch(error => console.error(`Error: ${error}`));
};

module.exports = {sendConfirmationEmail};