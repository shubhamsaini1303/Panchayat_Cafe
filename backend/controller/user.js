

const { decryptPassword, encryptPassword, getToken } = require("../helper");
const CartModel = require("../model/cart");
const UserModel = require("../model/user");

class UserController {

    async read(id) {
        try {
            let data;
            if (id) {
                data = await UserModel.findById(id);
                if (!data) {
                    return {
                        msg: "User not found",
                        status: 0,
                    };
                }
            } else {
                data = await UserModel.find();
            }
            return {
                data,
                msg: "All users found",
                status: 1,
            };
        } catch (error) {
            return {
                msg: "Something went wrong",
                status: 0,
            };
        }
    }

    async register(data) {
        try {
            const existingEmail = await UserModel.findOne({ email: data.email });
            if (existingEmail) {
                return {
                    msg: "Email already exists",
                    status: 0,
                };
            }

            const user = new UserModel({
                name: data.name,
                email: data.email,
                password: encryptPassword(data.password)
            });

            await user.save();
            return {
                msg: "User created",
                status: 1,
            };
        } catch (error) {
            return {
                msg: "Unable to create user",
                status: 0,
            };
        }
    }

    login(data){
        return new Promise (
            async (resolve , reject) => {
                try {
                    const user = await UserModel.findOne({email:data.email});
                   if(user){
                    if(decryptPassword(user.password) == data.password){
                        const token = getToken(user.toObject());
                        resolve({
                            msg:"Login Successfully",
                            status:1,
                            user,
                            token
                        })
                    } 
                    else{
                        reject({
                            msg:"wrong password",
                            status:0
                        })
                    }
                   } 
                    else{
                        reject({
                            msg:"invalid email",
                            status:0
                        })
                    }
                } catch (error) {
                    reject({
                        msg:"something went wrong",
                        status:0
                    })
                }
            } 
        )
    }

}

module.exports = UserController;





