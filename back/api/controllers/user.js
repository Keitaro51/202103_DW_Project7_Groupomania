//@ts-nocheck
const User = require('../models/User');
const Department = require('../models/Department');
const cryptojs = require('crypto-js/hmac-sha512');
const bcrypt = require('bcrypt');
//const fs = require('fs');

exports.disconnect = (req, res, next) => {
//TODO à faire lorsque l'enregistrement front du token sera implémenté dans le local ou session storage
};

exports.viewProfil = (req, res, next) => {
  User.findOne({
    attributes: [`email`, `firstname`, `lastname`, `department`, `creation_date`, `avatar`],
    where: { id: req.params.id }
  })
    .then(profil =>{ 
      if (profil === null) throw({status:404, message:"profil inexistant"});
      res.status(201).json({ profil, message: 'Profil utilisateur trouvé' })
    })
      .catch(error => res.status(error.status |400).json({ error, message: error.message | 'Profil utilisateur introuvable' }));
};

exports.profilUpdate = async (req, res, next) => {
  //TODO prise en charge des avatar
  const toUpdate = {};
  try {
    if (req.body.new_email) toUpdate.email = cryptojs(req.body.new_email, `${process.env.EMAIL_CRYPTOJS}`).toString();
    if (req.body.new_password) toUpdate.password = await crypt(req.body.new_password);
    if (req.body.new_firstname) toUpdate.firstname = req.body.new_firstname;
    if (req.body.new_lastname) toUpdate.lastname = req.body.new_lastname;
    if (req.body.new_department) toUpdate.department = req.body.new_department;
    if (req.body.new_avatar) toUpdate.avatar = req.body.new_avatar;

    await User.update(
      toUpdate,
      { where: { id: req.params.id } }
    );
    res.status(201).json({ message: 'Profil utilisateur modifié' });
  }
  catch(error){
    res.status(eroor.status | 400).json({ error, message: error.message | 'Profil utilisateur non modifié' });
  }
};

async function crypt(pass){
  try {
    return await bcrypt.hash(pass, 10)
  }
  catch (err){
    throw({status:500, message:"crypt failed"});
  }
}

exports.departmentList = async (req, res, next) =>{
  Department.findAll()
  .then(departments=>res.status(200).json({departments, message:'Liste des différents départements trouvée'}))
  .catch(error=> res.status(400).json({error, message:'Liste des départements non trouvée'}));
}