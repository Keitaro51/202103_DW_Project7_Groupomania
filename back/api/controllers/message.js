//@ts-nocheck
const Message = require('../models/Message');
const User = require('../models/User');
const { Op, ForeignKeyConstraintError } = require("sequelize");
const { findOne, belongsTo } = require('../models/Message');
//const fs = require('fs');

exports.newMessage = (req, res, next) => {
    Message.create({creator_id: req.body.userId, creation_date: Date(), title: req.body.title, content:req.body.content, parent_msg_id: req.body.parent_msg_id})
        .then(()=>res.status(201).json({message:'Message enregistré'}))
        .catch(error => {
            console.log("----------",error);
            res.status(400).json({error, message:'Message non enregistré'})
        });  
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
                    .then(()=>res.status(200).json({message:'Message(s) supprimé(s)'}))
                    .catch(error => res.status(400).json({error, message:'Message(s) non supprimé(s)'}));  
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
    let answer = {
        count : 0,
        list:[]
    };
    let tmp;
    Message.findAndCountAll({
        //FIXME FK 
        include:[
            {model:User,
            required: true,
            all:true}
        ],
        order:[['creation_date', 'DESC']],
        offset: 10 * req.body.pageNbr - 10,
        limit: 10,
        
    })
        .then( async list=>{
                answer.count = list.count;
                for(let i = 0; i<list.rows.length;i++){
                    tmp = list.rows[i].dataValues;
                    if(tmp.title === null || tmp.title == ""){
                        tmp.title = (await findTitle(tmp.parent_msg_id)).title;
                    }
                    answer.list.push(tmp)
                };
            res.status(200).json({...answer, message:'10 derniers messages'})
        })
        .catch(error => {
            console.log('///// ' + error);
            res.status(400).json({error, message:'Messages non récupérés'})});     
};
function findTitle(parentId){
    return Message.findOne(
        {attributes:['title'], 
        where:{id:parentId}})
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

exports.responseList = (req, res, next) => { //TODO récupérer en même temps que le parent dans viewMessage
    //récupère la liste d'id de totues les réponses à un message
    Message.findAll({
        where:{parent_msg_id:req.params.id},
        order:[['creation_date', 'ASC']]
    })
    .then(list=>res.status(200).json({list, message:`Liste des réponses au message id:${req.params.id} récupérée`}))
    .catch(error => res.status(400).json({error, message:`Liste des réponses au message id:${req.params.id} non récupérée`}));
}
