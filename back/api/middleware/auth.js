//@ts-nocheck
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.APP_SECRET);
        const userId = decodedToken.userId;
        if((!req.body.userId) || (req.body.userId && req.body.userId !== userId)){
            //FIXME remplacer par != permettrait d'enlever tous les parseint(localstorage... du front?)
            throw 'User ID non valable!';
        }
        next();
    } catch (error) {
        res.status(401).json({error:error | 'Requête non authentifiée'});
    };
};