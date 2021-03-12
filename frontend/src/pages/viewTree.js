import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router';
import { Container } from '@material-ui/core'
import "../style/viewTree.css";


export default function Father(){

    const [tree, setTree] = useState();
    
    var nomeUnico = useParams().nomeUnico

    useEffect(() => {
        async function fetch(){
          console.log("ok")
          let res = await axios.get(
            "http://localhost:3333/tree?nomeUnico=" + nomeUnico
          );
          res = await res.data
          setTree(res)
          console.log(tree)
        }
        fetch();
      }, [])

    console.log(tree)
    return(
        tree==undefined ?  <div></div> : <Tree tree={tree} />
    )
}

function Tree(props) {
    return (
        <Container maxWidth="sm">
            <div id="container">
                <img src={props.tree.icone} id="avatar"></img>
            </div>
            <div id="container">
                <h3 id="text">{props.tree.titulo}</h3>
            </div>
            <div class="container" style={{marginBottom:"20px"}}>
                {props.tree.itens.map((link,index) => {
                    return (
                        <div>
                        <a href={link.link} class="button" target="blank">{link.title}</a> <br />
                        </div>
                    )
                })}
            </div >
        </Container >
    )
}