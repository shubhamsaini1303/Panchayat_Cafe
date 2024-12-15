const {Router} = require("express");
const ColorController = require("../controller/color");

const ColorRouter = Router();

ColorRouter.get("/:id?", 
    (req,res) => {
        const result = new ColorController().read(req.params.id);
        result.then((success) => {
            res.send(success)
        }).catch((error) => {
            res.send(error)
        })
    }
);


ColorRouter.post("/create", 
    async (req, res) => {
    try {
      const result = await new ColorController().create(req.body);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  ColorRouter.delete("/delete/:id", 
    async (req,res) => {
      try {
        const result = await new ColorController().delete(req.params.id);
        res.send(result);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );

  ColorRouter.put("/change-status/:id/:new_status", async (req, res) => {
    try {
      const result = await new ColorController().changeStatus(req.params.id, req.params.new_status);
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // ColorRouter.put("/update/:id", 
  //   async (req,res) => {
  //   try {
  //     const result = await new ColorController().update(req.params.id, );
  //     res.send(result);
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
  // })

  ColorRouter.put("/update/:id", 
    async (req, res) => {
      try {
        // Pass the ID from the route parameters and the update data from the request body
        const result = await new ColorController().update(req.params.id, req.body);
        res.send(result);
      } catch (error) {
        res.status(500).send({
          message: "Internal server error",
          error: error.message // Provide error details for debugging
        });
      }
    }
  );
  

module.exports = ColorRouter;