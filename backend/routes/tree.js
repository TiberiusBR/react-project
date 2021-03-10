import { Router } from "express";

export default function (db) {
  const routes = Router();

  routes.post("/create", async (req, res) => {
    var tree = {
      userEmail: req.body.userEmail,
      nomeUnico: req.body.nome,
      titulo: req.body.titulo,
      icone: req.body.titulo,
      itens: req.body.itens,
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
      await db.collection("trees").deleteOne({userEmail:req.query.email});
      res.json(tree);
    } catch (error) {
      res.status(400).json({ ERROR: "FAILED TO DELETE TREE" });
    }
  });

  return routes;
}
