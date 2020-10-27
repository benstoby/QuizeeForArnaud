var nodemailer = require('nodemailer');

var sendmail = function(from, subject, text)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stbd95210@gmail.com',
            pass: 'Melimelo2'
        }
    });

    var mailOptions = {
        from: from,
        to: 'stbd95210@gmail.com',
        subject: from +' nous contact a propos de : '+ subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent' + info.response);
        }
    });
}

exports.sendmail = sendmail;