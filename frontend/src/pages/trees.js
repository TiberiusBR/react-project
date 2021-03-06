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

  deleteTree = async (nomeUnico) => {
    try {
      await axios.delete("http://localhost:3333/tree/delete?nomeUnico=" + nomeUnico)
    } catch (error) {
      alert("TREE NOT FOUND.");
    }
  };

  createTree = () => {
    window.location.href = "/newTree/" + emailTest
  }

  return (
    trees == undefined ?  <div></div> :
    <div>
      <Comp2/>
      <TreesG key={trees._id} trees={trees} />
    </div>
  );
}

function Comp2() {

  var emailTest = useParams().userEmail

  return (
    <AppBar position="static">
      <Toolbar>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Bem vindo, {emailTest} </p>
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
              <h4 style={{ textAlign: "center" }}>
                <a href="/">
                  {tree.titulo}
                </a>
              </h4>
            </CardContent>
            <CardActions>
              <Button size="small" >
                Editar
              </Button>
              <Button size="small" onClick={(e) => deleteTree(tree.nomeUnico)} >Deletar</Button>
            </CardActions>
          </Card>
        );
      })} 
    </div>
  );

}

export default Trees
