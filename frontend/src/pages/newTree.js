import { AppBar, Container, Toolbar, TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React , {useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
      flexDirection: "row",
    }
}));

function Comp() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Creating a new Tree </p>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

function NewTree() {

    const [treeTitle, setTreeTitle] = useState();
    const [treeUrl, setTreeUrl] = useState();
    const [treeIcon, setTreeIcon] = useState();
    const [treeItens, setTreeItens] = useState([]);

    var userEmail = useParams().userEmail

    const changeItem = (index, key, value) => {
        const links = [...treeItens]
        links[index][key] = value
        setTreeItens(links)
        console.log(treeItens)
    }

    useEffect(() => {
        setTreeItens([{link:"",title:""},{link:"",title:""},{link:"",title:""}])
    }, [])

    let createTree = async () =>{
        try {
            var res = await axios.post("http://localhost:3333/tree/create" ,
             {treeTitle, treeUrl , treeIcon, treeItens, userEmail})
            window.location.href = "/"
            alert("Tree created with success!")
        } catch (error) {
            alert("Something went wrong. ")
        }
    }

    const classes = useStyles()
    
  return(
      <div className={classes.root}>
          <Container maxWidth="sm">
            <form style={{textAlign: "center"}}>
                <TextField style={{marginTop:"30px"}} fullWidth id="standard-basic" 
                label="Tree Title" onChange={(e) => setTreeTitle(e.target.value)}></TextField>
                <TextField style={{marginTop:"30px"}} fullWidth id="standard-basic" 
                label="URL for acessing" onChange={(e) => setTreeUrl(e.target.value)}></TextField>
                <TextField style={{marginTop:"30px"}} fullWidth id="standard-basic" 
                label="Tree icon URL" onChange={(e) => setTreeIcon(e.target.value)}></TextField>
                <p style={{fontSize: "20px"}}>Tree itens</p>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px" , marginRight:"7px"}} id="standard-basic" onChange={(e)=>changeItem(0, "title", e.target.value)} label="Title 1"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px"}} id="standard-basic" label="Link 1" onChange={(e)=>changeItem(0, "link", e.target.value)}></TextField>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px" , marginRight:"7px"}} id="standard-basic" onChange={(e)=>changeItem(1, "title", e.target.value)} label="Title 1"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px"}} id="standard-basic" label="Link 1" onChange={(e)=>changeItem(1, "link", e.target.value)}></TextField>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px" , marginRight:"7px"}} id="standard-basic" onChange={(e)=>changeItem(2, "title", e.target.value)} label="Title 1"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px"}} id="standard-basic" label="Link 1" onChange={(e)=>changeItem(2, "link", e.target.value)}></TextField>
                    </Grid>
                </Grid>
                <p style={{textAlign:"center"}}>
                        <Button style={{marginTop:"30px"}} variant="contained" 
                        onClick={createTree}>Create Tree</Button>
                </p>
            </form>
          </Container>
      </div>
  );
}

export default function() {

    return(
        <div>
            <Comp />
            <NewTree />
        </div>
    )
}
