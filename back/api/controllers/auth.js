//@ts-nocheck
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cryptojs = require('crypto-js/hmac-sha512');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

exports.sign = (req, res, next) => {
  const emailCryptoJs = cryptojs(req.body.email, `${process.env.EMAIL_CRYPTOJS}`).toString();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({ email: emailCryptoJs, firstname: req.body.firstname, lastname: req.body.lastname, department: req.body.department, password: hash, creation_date: Date(), is_connected: Date() })
        .then(user => res.status(201).json({ user, message: 'Utilisateur créé' }))
        .catch(() => res.status(400).json({ error: 'Utilisateur non créé' }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs(req.body.email, `${process.env.EMAIL_CRYPTOJS}`).toString();
  //search in database if user exist
  User.findOne({ attributes: ['id', 'email', 'password', 'rights'], where: { email: emailCryptoJs } })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'Utilisateur non trouvé!' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Connexion échouée' })
          }
          res.status(200).json({
            userId: user.id,
            userRights:user.rights,
            token: jwt.sign(
              { userId: user.id },
              process.env.APP_SECRET,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.forgot = (req, res, next) => {
  const emailCryptoJs = cryptojs(req.body.email, `${process.env.EMAIL_CRYPTOJS}`).toString();
  User.findOne({ attributes: ['email', 'password'], where: { email: emailCryptoJs } })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'Email non trouvé' })
      }
      //génération d'un nouveau mot de passe
      const new_pass = generator.generate({ length: 15, numbers: true, symbols: true, strict: true })
      //enregistrement du nouveau mot de passe crypté
      bcrypt.hash(new_pass, 10)
        .then(hash => {
          User.update({ password: hash }, { where: { email: emailCryptoJs } })
            .then(() => {
              //preparing and sending email
              const smtpConfig = {
                host: "smtp-mail.outlook.com",
                port: 587,
                tls: {
                  ciphers: 'SSLv3'
                },
                auth: {
                  user: `${process.env.MAIL_ACCOUNT}`,
                  pass: `${process.env.MAIL_PASSWORD}`
                }
              };
              const transporter = nodemailer.createTransport(smtpConfig);

              const mailOptions = {
                from: `${process.env.MAIL_ACCOUNT}`,
                to: `${req.body.email}`,
                subject: `Réinitialisation email`,
                text: `Veuillez trouver ci après votre nouveau mot de passe. Vous pouvez le modifier dans votre espace personnel. Mot de passe=> ${new_pass}`
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email envoyé: ' + info.response);
                  return res.status(201).json({ message: 'Email Envoyé' })

                }
              });
              res.status(201).json({ message: 'Mot de passe mis à jour dans la base' })
            })
            .catch(() => res.status(400).json({ error: 'Mot de passe inchangé' }));
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};