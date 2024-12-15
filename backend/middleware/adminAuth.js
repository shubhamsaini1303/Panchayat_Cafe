const { verifyToken } = require("../helper");

const AdminAuth = (req, res, next) => {
    const apikey = req.headers.authorization;
    if(verifyToken(apikey)){
        next();
    }else{
        res.send({
            msg:"Unauthorized",
            status:0
        })
    }
} 

module.exports = AdminAuth;

