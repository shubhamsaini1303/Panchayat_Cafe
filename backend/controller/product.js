const ProductModel = require("../model/product");
const Category = require("../model/Category");

class ProductController {

    create(data , image){
        return new Promise (
            (resolve ,  reject) => {
                try {
                const imageName = new Date().getTime() + Math.floor(Math.random() * 1000 ) + image.name;
                const destination = "./Public/Images/Product/" + imageName;
                image.mv(
                    destination, 
                    (err) => {
                        if(err) {
                            reject({
                                message:"unable to upload image",
                                status:0
                            })
                        }
                        else {
                            const product = new ProductModel({
                                name:data.name,
                                slug:data.slug,
                                price:data.price,
                                discount_precent:data.discount_precent,
                                discount_price:data.discount_price,
                                image: imageName,
                                // shop_address:data.shop_address,
                                // ratings:data.ratings,
                                time:data.time,
                                // shop_name:data.shop_name,
                                category_id:data.category,
                                color:JSON.parse(data.color)        
                            })
                            product.save().then(() => {
                                resolve({
                                    message:"product created",
                                    status:1
                                })
                            }
                        ).catch((error) => {
                            console.log(error.message);
                            reject({
                                message: "unable to create the product",
                                status:0   
                            })
                        })
                        }
                    }
                )
                } catch (error) {
                    reject({
                        message:"Internal server error",
                        status:0
                    })
                }
            }
        )
    }


    read(id, query) {
        return new Promise(async (resolve, reject) => {
            try {
                const dbQuery = {};
                const category = await Category.findOne({slug: query.category_slug});
                if(category != null){
                    dbQuery.category_id = category._id
                }
                    // If color_id is provided and is not "null"
                let product = [];
                if (id) {
                    // Attempt to populate 'category_id' and 'color'
                    product = await ProductModel.findById(id)
                        .populate('category_id')  // Populate category_id
                        .populate('color');       // Populate color
    
                    // If category_id is missing or fails to populate
                    if (!product || !product.category_id) {
                        return reject({
                            message: "Category not found or population failed",
                            status: 0
                        });
                    }
                } else {
                    if(query.limit != 0){
                        product = await ProductModel.find(dbQuery)
                        .populate('category_id')
                        .populate('color')
                        .limit(query.limit);
                    }else{
                        // Fetch all products without ID, but still populate fields
                        product = await ProductModel.find(dbQuery)
                            .populate('category_id')
                            .populate('color');
                    }
                }
    
                resolve({
                    message: "Product Found",
                    status: 1,
                    product,
                    imageBaseUrl: "/Images/Product/",
                 });
            } catch (error) {
                reject({
                    message: "Internal server error",
                    status: 0,
                    error: error.message,  // Include error message for debugging
                });
            }
        });
    };

    delete(id){
        return new Promise (
            (resolve, reject) => {
                try {
                    ProductModel.deleteOne({_id : id})
                    .then(() => {
                        resolve({
                            message:"User Deleted",
                            status:1
                        })
                    }
                ).catch(() => {
                    reject({
                        message:"Unable to delete User",
                        status:0
                    })
                })
                    
                } catch (error) {
                    reject({
                        message : "Something went wrong",
                        status:0
                    })
                }
            }
        )
    };

    changeStatus(id, new_status){
        return new Promise (
            (resolve , reject) => {
                try {
                    ProductModel.updateOne(
                        {_id : id},
                        {status: new_status}
                    ).then(() => {
                        resolve({
                            message:"Status Changed",
                            status:1
                        })
                    }
                ).catch(() => {
                    reject({
                        message:"Unable to Change the Status",
                        status:0
                    })
                })
                } catch (error) {
                    reject({
                        message:"Something Went Wrong",
                        status:0
                    })
                }
            }
        )
    }

    update(id, data, image) {
        return new Promise(async (resolve, reject) => {
            try {
                // Find the product by ID
                const product = await ProductModel.findById(id);
                
                if (!product) {
                    return reject({
                        message: "Product not found",
                        status: 0
                    });
                }

                // Update fields with new data
                product.name = data.name || product.name;
                product.slug = data.slug || product.slug;
                product.price = data.price || product.price;
                product.discount_precent = data.discount_precent || product.discount_precent;
                product.discount_price = data.discount_price || product.discount_price;
                product.category_id = data.category || product.category_id;
                product.color = JSON.parse(data.color) || product.color;

                // Check if a new image is provided
                if (image) {
                    const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
                    const destination = "./Public/Images/Product/" + imageName;

                    // Move new image to destination
                    image.mv(destination, (err) => {
                        if (err) {
                            return reject({
                                message: "Unable to upload image",
                                status: 0
                            });
                        }
                    });
                    product.image = imageName; // Update image field in database
                }

                // Save the updated product to the database
                await product.save();
                
                resolve({
                    message: "Product updated successfully",
                    status: 1
                });

            } catch (error) {
                console.error("Error updating product:", error.message);
                reject({
                    message: "Internal server error",
                    status: 0,
                    error: error.message  // Include error message for debugging
                });
            }
        });
    }

    
};

module.exports =ProductController;