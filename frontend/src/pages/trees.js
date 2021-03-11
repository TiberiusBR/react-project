import React , {useState,useEffect} from "react";
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

var deleteTree = ""

function Trees() {
  const [trees, setTrees] = useState([]);

  var emailTest = useParams().userEmail

  useEffect(async () => {
    console.log("UseEffect entered.")
    try {
      var res = await axios.get(
        "http://localhost:3333/user/user-trees?email=" + emailTest
      );
      setTrees(res.data);
    } catch (error) {
      alert("No trees found.");
    }
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3333/user/user-trees?email=" + emailTest)
  //   .then(res => setTrees(res.data)).catch(() => alert("error")) 
  //  } , [emailTest])

  deleteTree = async () => {
    try {
      await axios.post("http://localhost:3333/tree/delete", {
        userEmail: emailTest,
      });
    } catch (error) {
      alert("TREE NOT FOUND.");
    }
  };

  return (
    <div>
      <Comp2 key={trees[0]._id} nome={trees[0].nome}/>
      <TreesG key={trees[0]._id} trees={trees} />
    </div>
  );
}

function Comp2(props) {
  let user = props.nome
  return (
    <AppBar position="static">
      <Toolbar>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Bem vindo, {user} </p>
          <a href="/new-tree" id="criar-tree">
            Criar Tree
          </a>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

function TreesG(props) {
  console.log(props)
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
              <Button size="small" href={"/tree/" + tree.nome}>
                Editar
              </Button>
              <Button size="small" onClick={deleteTree}>Deletar</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default Trees
