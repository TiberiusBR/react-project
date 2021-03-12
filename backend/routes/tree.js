import { Router } from "express";

export default function (db) {
  const routes = Router();

  routes.get("/", async(req,res) => {
    var tree = req.query.nomeUnico

    const search = await db.collection("trees").findOne({nomeUnico: tree})

    if (search) {
      res.json(search);
    } else {
      res.status(404).json({ ERROR: "USER TREES NOT FOUND" });
    }
  })

  routes.post("/create", async (req, res) => {
    var tree = {
      userEmail: req.body.userEmail,
      nomeUnico: req.body.treeUrl,
      titulo: req.body.treeTitle,
      icone: req.body.treeIcon,
      itens: req.body.treeItens,
    };
    try {
      await db.collection("trees").insertOne(tree);
      res.json(tree);
    } catch (error) {
      res.status(400).json({ ERROR: "FAILED TO INSERT USER" });
    }
  });

  routes.post("/update", async (req, res) => {
    var tree = {
      userEmail: req.body.userEmail,
      nomeUnico: req.body.nome,
      titulo: req.body.titulo,
      icone: req.body.icone,
      itens: req.body.itens
    };
    try {
      await db.collection("trees").replaceOne({userEmail: req.body.userEmail}, req.body)
      res.json(tree);
    } catch (error) {
      res.status(400).json({ ERROR: "FAILED TO UPDATE TREE" + error.message });
    }
  });

  routes.delete("/delete", async (req, res) => {
    try {
      await db.collection("trees").deleteOne({nomeUnico:req.query.nomeUnico});
      res.json({SUCCESS: "TREE DELETED"});
    } catch (error) {
      res.status(400).json({ ERROR: "FAILED TO DELETE TREE" });
    }
  });

  return routes;
}
