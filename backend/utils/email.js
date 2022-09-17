const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = catchAsync(async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
    // Activate in gmail less secure app option
  });

  // define email options
  const emailOptions = {
    from: 'Admin 1 <admin1@digitize-web.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // actually send the email
  await transporter.sendMail(emailOptions);
});

module.exports = sendEmail;
