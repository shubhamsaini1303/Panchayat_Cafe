const AdminModel = require("../model/admin");
const { encryptPassword, decryptPassword, getToken } = require('../helper');

class AdminController {
    register(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const isAdmin = await AdminModel.findOne({
                        $or: [
                            { email: data.email },
                            { contact: data.contact },
                        ]
                    });
                    if (isAdmin) {
                        rej({
                            msg: "Admin with provided email or contact already exists",
                            status: 0
                        })
                    } else {
                        const admin = new AdminModel({
                            name: data.name,
                            email: data.email,
                            password: encryptPassword(data.password),
                            contact: data.contact
                        })
                        admin.save()
                            .then(
                                (success) => {
                                    res({
                                        msg: "Admin created",
                                        status: 1
                                    })
                                }
                            ).catch(
                                (error) => {
                                    rej({
                                        msg: "Unable to create admin",
                                        status: 0
                                    })
                                }
                            )
                    }
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const admin = await AdminModel.findOne({ email: data.email });
                    if (admin) {
                        // 0987654321 ==  0987654321
                        if (data.password == decryptPassword(admin.password)) {
                            res({
                                msg: "Login successful",
                                admin: { ...admin.toJSON(), password: null },
                                token: getToken(admin.toJSON()),
                                status: 1
                            })
                        } else {
                            rej({
                                msg: "Wrong password provided",
                                status: 0
                            })
                        }
                    } else {
                        rej({
                            msg: "Invalid email provided",
                            status: 0
                        })
                    }
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = AdminController;