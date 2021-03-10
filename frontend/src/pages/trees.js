import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { AppBar, Toolbar, Container, Button, Card, CardActions, CardContent } from "@material-ui/core";
import axios from "axios";

export default function Trees() {
  
  const [email, setEmail] = useState();
  const [trees, setTrees] = useState();

  setEmail(useParams().userEmail);

  useEffect(async () => {
    try {
      var res = await axios.get(
        "http://localhost:3333/user/user-trees?email=" + email
      );
      setTrees(res.data);
    } catch (error) {
      alert("No trees found.");
    }
  }, [email]);

  var deleteTree = async () =>{
    try {
        await axios.post("http://localhost:3333/tree/delete" , {userEmail: email})
    } catch (error) {
        alert("TREE NOT FOUND.")
    }
}

  function Comp2() {
    let user = "Heitor";
    return (
      <AppBar position="static">
        <Toolbar>
          <Container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
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
        {props.trees.map((tree, index) => {
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
                <Button size="small" href={"/tree/" + tree.nomeUnico}>
                  Editar
                </Button>
                <Button size="small" onClick={deleteTree()}>
                  Deletar
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }

  // function PaginaInteira() {
  //   let a = { nomeUnico: "shitposts", img: "maxresdefault.jpg", nome: "sht pst" }
  //   let trees = [a, a, a, a, a, a, a, a, a, a, a, a]
  //   return (
  //     <div>
  //       <Comp2 />
  //       <TreesG trees={trees}/>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Comp2 />
      <TreesG trees={trees}/>
    </div>
  )
}
