//@ts-nocheck
const Message = require('../models/Message');
const fs = require('fs');


exports.newMessage = (req, res, next) => {
    Message.create({creator_id: req.body.userId, creation_date: Date(), title: req.body.title, content:req.body.content, parent_msg_id: req.body.parent_msg})
        .then(()=>res.status(201).json({message:'Message enregistré'}))
        .catch(error => res.status(400).json({error, message:'Message non enregistré'}));  
};

exports.deleteMessage = (req, res, next) => {
    Message.destroy({where: {id:req.body.messageId}})
        .then(()=>res.status(200).json({message:'Message supprimé'}))
        .catch(error => res.status(400).json({error, message:'Message non supprimé'}));  

};

exports.modifyMessage = (req, res, next) => {};

exports.lastsMessages = (req, res, next) => {};
exports.viewMessage = (req, res, next) => {};
