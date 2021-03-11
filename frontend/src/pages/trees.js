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
var createTree = ""

function Trees() {
  const [trees, setTrees] = useState([]);

  var emailTest = useParams().userEmail

  useEffect(() => {
    async function fetch(){
      let res = await axios.get(
        "http://localhost:3333/user/user-trees?email=" + emailTest
      );
      res = await res.data
      setTrees(res)
    }
    fetch();
  }, [])

  // function Comp1 (){
  //   useEffect(() => {
  //     try {
  //       var res = await axios.get(
  //         "http://localhost:3333/user/user-trees?email=" + emailTest
  //       );
  //       setTrees(res.data);
  //     } catch (error) {
  //       alert("No trees found.");
  //     }
  //   })
  // }

  // useEffect(async () => {
  //   console.log("UseEffect entered.")
    
  // }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3333/user/user-trees?email=" + emailTest)
  //   .then(res => setTrees(res.data)).catch(() => alert("error")) 
  //  } , [])

  deleteTree = async () => {
    try {
      await axios.delete("http://localhost:3333/tree/delete", {
        userEmail: emailTest,
      });
    } catch (error) {
      alert("TREE NOT FOUND.");
    }
  };

  createTree = () => {
    window.location.href = "/newTree/" + emailTest
  }

  return (
    <div>
      <Comp2 nome={trees}/>
      <TreesG trees={trees} />
    </div>
  );
}

function Comp2(props) {
  console.log(props)
  return (
    <AppBar position="static">
      <Toolbar>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Bem vindo, usuário! </p>
          <button onClick={createTree} id="criar-tree">
            Criar Tree
          </button>
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
              <Button size="small" >
                Editar
              </Button>
              <Button size="small" >Deletar</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default Trees
