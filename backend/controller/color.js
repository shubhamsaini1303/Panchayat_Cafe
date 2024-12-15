const ColorModel = require("../model/color");

class ColorController {

    create(data){
        return new Promise (
             (resolve, reject) => {
                const colors = new ColorModel({
                    name:data.name,
                    code: data.color
                });

                colors.save().then(() => {
                    resolve({
                        message:"Color Added",
                        status:1
                    })
                }
            ).catch(() => {
                reject({
                    message: "Unable to Added color",
                    status:0
                })
            })
                try {
                    
                } catch (error) {
                    reject({
                        message:"Something went wrong",
                        status:0
                    })
                }
            }
        )
    };

    read(id){
        return new Promise (
           async (resolve, reject) => {
                try {
                    let colors = [];
                    if(id){
                        colors = await ColorModel.findById(id);
                    } else{
                        colors = await ColorModel.find();
                    }
                    resolve({
                        colors,
                        message:"Colors Found",
                        status:1
                    })
                } catch (error) {
                    reject({
                        message:"Something went wrong",
                        status:0
                    })
                }
            }
        )
    };

    
    delete(id){
        return new Promise (
            (resolve, reject) => {
                try {
                    ColorModel.deleteOne({_id : id})
                    .then(() => {
                        resolve({
                            message: "user deleted" ,
                            status: 1
                        })
                    })
                    .catch(() => {
                        reject({
                            message: "unable to delete",
                            status: 0
                        })
                    })
                } catch (error) {
                    reject({
                        message :"internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    
    changeStatus(id, new_status) {
        return new Promise((resolve, reject) => {
            ColorModel.updateOne(
                { _id: id },
                { status: new_status }
            )
            .then(() => {
                resolve({
                    message: "Status Changed",
                    status: 1
                });
            })
            .catch((error) => {
                reject({
                    message: "Unable To Change The Status",
                    status: 0
                });
            });
        });

};

update(id , data){
    return new Promise(
       async  (resolve, reject) => {
            try {
                await new ColorModel.updateOne({_id : id} , {name: data.name, code : data.color})
                .then(() => {
                    resolve({
                        message: "Data Updated",
                        status:1
                    });
                }
            ).catch(() => {
                reject({
                    message:"unable to update the data",
                    status:0
                })
            })
            } catch (error) {
                reject({
                    message:"internal server error",
                    status:0
                })
            }

        }
    )
}




};

module.exports = ColorController;