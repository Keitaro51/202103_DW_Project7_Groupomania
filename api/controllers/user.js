//@ts-nocheck
const User = require('../models/User');
const cryptojs = require('crypto-js/hmac-sha512');
const bcrypt = require('bcrypt');
//const fs = require('fs');

exports.disconnect = (req, res, next) => {

};

exports.viewProfil = (req, res, next) => {
  User.findOne({
    attributes: [`email`, `firstname`, `lastname`, `department`, `creation_date`, `avatar`],
    where: { id: req.params.id }
  })
    //TODO récupèré aussi les profil null (si on pase une id qui n'existe pas) - idem api/message/:id
    .then(profil => res.status(201).json({ profil, message: 'Profil utilisateur trouvé' }))
    .catch(error => res.status(400).json({ error, message: 'Profil utilisateur introuvable' }));
};

exports.profilUpdate = (req, res, next) => {
  //TODO prise en charge des avatar
  const emailCryptoJs = cryptojs(req.body.new_email, `${process.env.EMAIL_CRYPTOJS}`).toString();
  User.update(
    { email: emailCryptoJs, firstname: req.body.new_firstname, lastname: req.body.new_lastname, department: req.body.new_department, avatar: req.body.new_avatar },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(201).json({ message: 'Profil utilisateur modifié' }))
    .catch(error => res.status(400).json({ error, message: 'Profil utilisateur non modifié' }));

  //dissocier changement de mdp dans nouvelle route? 
  if(req.body.new_password){
    bcrypt.hash(req.body.new_password, 10)
      .then(hash => {
        User.update(
          { password:hash },
          { where: { id: req.params.id } }
        )
          .then(() => res.status(201).json({ message: 'Mot de passe modifié' }))
          .catch(error => res.status(400).json({ error, message: 'Mot de passe non modifié' }));
      })
      .catch(error => res.status(500).json({error}));
  }
};