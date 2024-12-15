const express = require("express");
const ProductController = require("../controller/product");
const fileupload = require("express-fileupload");
const ProductRouter = express.Router();


ProductRouter.get("/:id?" , 
    (req, res) => {
        const result = new ProductController().read(req.params.id , req.query);
        result.then((success) => {
            res.send(success)
        }
    ).catch((error) => {
        res.send(error)
    })
    }
);


ProductRouter.post("/create" , 
    fileupload({
        createParentPath:true
    }),
    (req, res) => {
        const result = new ProductController().create(req.body , req.files.image);
        result.then((success) => {
            res.send(success)
        }
    ).catch((error) => {
        res.send(error)
    })
    }

);

ProductRouter.delete("/delete/:id" , async (req, res) => {
   try {
    const result = await new ProductController().delete(req.params.id);
    res.send(result);
   } catch (error) {
    res.send(error)
   };
});



ProductRouter.put("/change-status/:id/:new_status", async (req, res) => {
    try {
      const result = await new ProductController().changeStatus(req.params.id, req.params.new_status);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  ProductRouter.get("/all", async (req, res) => {
    try {
        const result = await new ProductController().getAllProducts(req.query);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});



//   Update product by ID
// ProductRouter.put('/update/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const data = req.body;
//         const image = req.files ? req.files.image : null; // Get the image file if it exists

//         // Call the update method of the ProductController
//         const result = await ProductController.update(id, data, image);

//         // Send the success response
//         res.status(200).json(result);
//     } catch (error) {
//         // Send error response if update fails
//         res.status(500).json({
//             message: error.message || "Internal server error",
//             status: 0
//         });
//     }
// });


// Update a product by ID
ProductRouter.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const image = req.files ? req.files.image : null; // Get the image file if provided

        // Create an instance of ProductController and call the update method
        const productController = new ProductController();
        const result = await productController.update(id, data, image);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update product",
            status: 0,
        });
    }
});







module.exports =ProductRouter;