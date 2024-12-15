const Category = require("../model/Category");
const fs = require('fs'); // Import the file system module


class CategoryController {


    read(id){
        return new Promise (
            async (resolve , reject) => {
                try {
                    let data = "";
                    if (id){
                        data = await Category.findById(id);
                    }
                    else{
                        data = await Category.find();
                    }
                    resolve({
                        category : data,
                        message: "data found",
                        status: 1,
                        imageBaseUrl: "/images/category/"
                    })
                } catch (error) {
                    reject({
                        message:"internal server error",
                        status: 0
                    })
                }
            }
        )
    };

    
    create(data, image) {
        return new Promise((resolve, reject) => {
            try {
                const imageName = new Date().getTime() + Math.floor(Math.random() * 1000 ) + image.name;
                const destination = "./Public/Images/Category/" + imageName;
                
                // The `image.mv` method takes a callback with `error` as its first parameter.
                image.mv(destination, (error) => { 
                    
                    if (error) {
                        // Handle the error if there's an issue during the file move
                        reject({
                            message: "Unable to upload image",
                            status: 0
                        });
                    } else {
                        // If the image was successfully moved, save the category
                        const category = new Category({
                            name: data.name,
                            slug: data.slug,
                            image: imageName
                        });
                        
                        category.save()
                            .then(() => {  
                                resolve({
                                    message: "Category Added Successfully",
                                    status: 1
                                });
                            })
                            .catch((err) => {
                                reject({
                                    message: "Unable to add Category",
                                    status: 0
                                });
                            });
                    }
                });
            } catch (error) {
                reject({
                    message: "Internal server error",
                    status: 0
                });
            }
        });
    }

    delete(id){
        return new Promise (
            (resolve, reject) => {
                try {
                    Category.deleteOne({_id : id})
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
            Category.updateOne(
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
    }

update(id, data, image) {
    return new Promise((resolve, reject) => {
        try {
            if (image == null) {
                // Update data without changing the image
                Category.updateOne({_id: id}, {name: data.name, slug: data.slug})
                    .then(() => {
                        resolve({
                            message: "Data Updated",
                            status: 1
                        });
                    })
                    .catch(() => {
                        reject({
                            message: "Unable to update",
                            status: 0
                        });
                    });
            } else {
                // Retrieve the current document to get the old image
                Category.findOne({_id: id})
                    .then((doc) => {
                        if (doc && doc.image) {
                            // Delete the old image file
                            const oldImagePath = `./Public/Images/Category/${doc.image}`;
                            fs.unlink(oldImagePath, (err) => {
                                if (err) {
                                    console.log("Failed to delete old image:", err);
                                }
                            });
                        }

                        // Upload the new image
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
                        const destination = `./Public/Images/Category/${imageName}`;
                        image.mv(destination, (err) => {
                            if (!err) {
                                // Update the database with new data and image
                                Category.updateOne({_id: id}, {
                                    name: data.name,
                                    slug: data.slug,
                                    image: imageName
                                })
                                    .then(() => {
                                        resolve({
                                            message: "Data Updated",
                                            status: 1
                                        });
                                    })
                                    .catch(() => {
                                        reject({
                                            message: "Unable to update",
                                            status: 0
                                        });
                                    });
                            } else {
                                reject({
                                    message: "Unable to upload file",
                                    status: 0
                                });
                            }
                        });
                    })
                    .catch(() => {
                        reject({
                            message: "Unable to find document",
                            status: 0
                        });
                    });
            }
        } catch (error) {
            reject({
                message: "Internal server error",
                status: 0
            });
        }
    });
}

    
}

module.exports = CategoryController;

