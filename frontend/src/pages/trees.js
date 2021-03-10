import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import axios from "axios";

function Comp2() {
  let user = "Heitor";
  return (
    <AppBar position="static">
      <Toolbar>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Bem vindo, {user}</p>
          <a href="/new-tree" id="criar-tree">
            Criar Tree
          </a>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

function TreesG(props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <h1>Ok bro</h1>
      {/* {props.trees.map((tree, index) => {
        return (
          <Card
            style={{
              minWidth: "10%",
              width: "fit-content",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            <CardContent>
              <h4 style={{ textAlign: "center" }}>{tree.nome}</h4>
            </CardContent>
            <CardActions>
              <Button size="small" href={"/tree/" + tree.nome}>
                Editar
              </Button>
              <Button size="small" >
                Deletar
              </Button>
            </CardActions>
          </Card>
        ); */}
      })}
    </div>
  );
}

export default function Trees() {
  const [email, setEmail] = useState();
  const [trees, setTrees] = useState();

  const emailTest = useParams().userEmail

  useEffect(async () => {
    try {
      var res = await axios.get(
        "http://localhost:3333/user/user-trees?email=" + emailTest
      );
      setTrees(res.data);
    } catch (error) {
      alert("No trees found.");
    }
  }, [email]);

  var deleteTree = async () => {
    try {
      await axios.post("http://localhost:3333/tree/delete", {
        userEmail: email,
      });
    } catch (error) {
      alert("TREE NOT FOUND.");
    }
  };

  return (
    <div>
      <Comp2 />
      <TreesG trees={trees} />
    </div>
  );
}
