//@ts-nocheck
const Message = require('../models/Message');
const User = require('../models/User');
const fs = require('fs');


exports.newMessage = (req, res, next) => {
    Message.create({creator_id: req.body.userId, creation_date: Date(), title: req.body.title, content:req.body.content, parent_msg_id: req.body.parent_msg})
        .then(()=>res.status(201).json({message:'Message enregistré'}))
        .catch(error => res.status(400).json({error, message:'Message non enregistré'}));  
};

//ajouter verif if  req.body.userId = creator_id
exports.deleteMessage = (req, res, next) => {
    //find rights of user who tried to delete msg
    User.findOne({attributes:['id', 'rights'], where:{id:req.body.userId}}) 
        .then(user=>{
            //check if user is the original creator of the message  or moderator or administrator
            if((req.body.userId == req.body.msgCreatorId) || (user.rights == 2) || (user.rights == 3)){
                Message.destroy({where: {id:req.body.messageId}})
                    .then(()=>res.status(200).json({message:'Message supprimé'}))
                    .catch(error => res.status(400).json({error, message:'Message non supprimé'}));  
            }else{
                throw error ='Opération non autorisée pour cet utilisateur!'
            }
            })
        .catch(error => res.status(400).json({error}));
};

exports.modifyMessage = (req, res, next) => {
    //find rights of user who tried to modify msg
    User.findOne({attributes:['id', 'rights'], where:{id:req.body.userId}}) 
        .then(user=>{
            //check if user is the original creator of the message  or moderator or administrator
            if((req.body.userId == req.body.msgCreatorId) || (user.rights == 2) || (user.rights == 3)){
                Message.update({title:req.body.new_title, content:req.body.new_content}, {where:{id:req.body.messageId}})
                    .then(()=>res.status(200).json({user, message:'Message modifié'}))
                    .catch(error => res.status(400).json({error, message:'Message non modifié'}));
            }else{
                throw error ='Opération non autorisée pour cet utilisateur!'
            }
        })
        .catch(error => res.status(400).json({error}));
};

exports.lastsMessages = (req, res, next) => {};
exports.viewMessage = (req, res, next) => {};
