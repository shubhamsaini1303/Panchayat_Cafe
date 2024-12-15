const Router = require("express");
const CategoryController = require("../controller/Category");
const fileUpload = require("express-fileupload");


const CategoryRouter = Router();

CategoryRouter.post("/create", fileUpload({ createParentPath: true }), async (req, res) => {
    try {
      const result = await new CategoryController().create(req.body, req.files.image);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  CategoryRouter.get("/:id?", async (req, res) => {
    try {
      const result = await new CategoryController().read(req.params.id);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  CategoryRouter.put("/change-status/:id/:new_status", async (req, res) => {
    try {
      const result = await new CategoryController().changeStatus(req.params.id, req.params.new_status);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  CategoryRouter.delete("/delete/:id", async (req, res) => {
    try {
      const result = await new CategoryController().delete(req.params.id);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  CategoryRouter.put("/update/:id", fileUpload({ createParentPath: true }), async (req, res) => {
    let image = req.files?.image || null;
    try {
      const result = await new CategoryController().update(req.params.id, req.body, image);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
  

module.exports = CategoryRouter;
