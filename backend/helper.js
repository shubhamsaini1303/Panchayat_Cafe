 const Cryptr = require('cryptr');
const cryptr = new Cryptr("wscubetect@jaipur");
const user_tokens = new Map();
// const {v4} = require("uuid");
const secret_key = "wscubetechjaipur";
const jwt = require("jsonwebtoken");


const encryptPassword = (password) => {
    return cryptr.encrypt(password);
}

const decryptPassword = (password) => {
    return cryptr.decrypt(password);
}

const getToken = (user_data) => {
    // const token = v4();
    // user_tokens.set(token , user_data);
    const token = jwt.sign(user_data , secret_key ,  {expiresIn:"24h"});
    return token;
};

const verifyToken = (token) => {
    // return user_tokens.get(token)
    try {
        return jwt.verify(token , secret_key);
    } catch (error) {
        return false;
    }
};

module.exports = { encryptPassword, decryptPassword, getToken , verifyToken };  