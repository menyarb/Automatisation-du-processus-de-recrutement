const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'votre-adresse-email@gmail.com',
        pass: 'votre-mot-de-passe'
    }
});

app.post('/sendEmail', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'votre-adresse-email@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            res.status(500).send('Une erreur est survenue lors de l\'envoi de l\'e-mail');
        } else {
            console.log('E-mail envoyé avec succès:', info.response);
            res.status(200).send('E-mail envoyé avec succès');
        }
    });
});

app.listen(3001, () => {
    console.log('Serveur écoutant sur le port 3001');
});
