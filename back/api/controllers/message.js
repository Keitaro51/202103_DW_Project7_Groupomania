//@ts-nocheck
const Message = require('../models/Message');
const User = require('../models/User');
const { Op, ForeignKeyConstraintError } = require("sequelize");
//const fs = require('fs');

exports.newMessage = (req, res, next) => {
    Message.create({creator_id: req.body.userId, creation_date: Date(), title: req.body.title, content:req.body.content, parent_msg_id: req.body.parent_msg})
        .then(()=>res.status(201).json({message:'Message enregistré'}))
        .catch(error => res.status(400).json({error, message:'Message non enregistré'}));  
};

//ajouter suppression des messages enfants (réponses)
exports.deleteMessage = (req, res, next) => {
    //find rights of user who tried to delete msg
    User.findOne({attributes:['id', 'rights'], where:{id:req.body.userId}}) 
        .then(user=>{
            //check if user is the original creator of the message  or moderator or administrator
            if((req.body.userId == req.body.msgCreatorId) || (user.rights == 2) || (user.rights == 3)){
                //delete message and all associated responses
                //TODO sqlMessage": "Cannot delete or update a parent row: a foreign key constraint fails (`groupomania_test`.`messages`, CONSTRAINT `fk_parent_msg_id` FOREIGN KEY (`parent_msg_id`) REFERENCES `messages` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT)",
                //"sql": "DELETE FROM `messages` WHERE (`id` = 37 OR `parent_msg_id` = 37)"
                Message.destroy({
                    where: {
                        [Op.or]: [{ id:req.body.messageId }, { parent_msg_id:req.body.messageId }]
                    }
                })
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

exports.lastsMessages = (req, res, next) => {
    //find 10 last messages (responses includes)
    Message.findAll({
        order:[['creation_date', 'DESC']],
        limit: 10
    })
        .then(list=>{
            //TODO quand title == null, afficher title du parent_msg_id 
            //impossible avant le res car le format de list est trop exotique
            // for(let i = list.length;i>0;i--){
                // if(list[i].title === null){
                    //list[i].title = "test"
                //}
            // };
            res.status(200).json({list, message:'10 derniers messages'})
        })
        .catch(error => res.status(400).json({error, message:'Messages non récupérés'}));  
        //TODO n'affichera pas le titre des reponses car NULL ni le titre de leurs éléments parents
};
exports.viewMessage = (req, res, next) => {
    //find asked message
    Message.findOne({
        where: {id:req.params.id}
    })
        .then(msg=>{
            if (msg === null) throw({status:404, message:"message inexistant"});
            res.status(200).json({msg, message:'Messages récupéré'})
        })
        .catch(error => res.status(error.status | 400).json({error, message:error.message | 'Message non récupéré'}));  
};
