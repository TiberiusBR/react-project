import { Router } from "express";
import encrypt from "../logic/encrypt.js";


export default function (db) {
  const routes = Router();

  routes.get("/teste", async (req, res) => {
    res.json({ res: "testinho certo" });
  });

  routes.post("/criar-conta", async (req, res) => {
    var email = req.body.email;
    var nome = req.body.nome
    var senha = "";

    for (let i = 0; i < req.body.senha.length; i++) {
      senha += encrypt(req.body.senha[i], 13);
    }
    var user = { email, senha, nome };
    var userVerify = await db.collection("users").findOne(user);

    if (userVerify) {
      res.status(400).json({ ERROR: "EMAIL ALREADY REGISTERED." });
    } else {
      await db.collection("users").insertOne(user);
      res.json(user);
    }
  });

  routes.post("/login", async (req, res) => {
    var email = req.body.email;
    var senha = "";
    for (let i = 0; i < req.body.senha.length; i++) {
      senha += encrypt(req.body.senha[i], 13);
    }
    var user = {email, senha};
    var emailMongo = await db.collection("users").findOne(user);

    if (emailMongo == null) {
      res.status(400).json({ ERROR: "INVALID EMAIL OR PASSWORD." });
    } else {
      res.json(user);
    }
  });

  routes.get("/user-trees", async (req, res) => {
    // var tree = {
    //     userEmail: string,
    //     nomeUnico: string,
    //     titulo: string,
    //     icone: string,
    //     itens:[{
    //         link: string,
    //         titulo: string
    // }]}

    var email = req.query.email;

    const search = await db.collection("trees").find({userEmail: email}).toArray();

    if (search) {
      res.json(search);
    } else {
      res.status(404).json({ ERROR: "USER TREES NOT FOUND" });
    }
  });
  return routes;
}