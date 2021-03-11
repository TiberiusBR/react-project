import { AppBar, Container, Toolbar, TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import '../style/createTree.css'
import React , {useState , useEffect} from "react";

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
    const [itemAdded, setItemAdded] = useState([false,false,false]);

    useEffect(() => {
        setItemAdded([])
    }, [])

    console.log(itemAdded)

    // var itemAdded = [false,false,false]

    // function disableClick(i){
    //     console.log(itemAdded)
    //     itemAdded[i] = true
    // }

    const addItem = () => {
        setTreeItens([...treeItens, {
            
        }])
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
                        <TextField style={{marginTop:"30px" , marginRight:"7px"}} id="standard-basic" label="Title 1"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px"}} id="standard-basic" label="Link 1"></TextField>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Button variant="contained" color="primary" style={{marginTop:"20px"}}
                        onClick={disableClick(0)}>ADD ITEM</Button>
                    </Grid> */}
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px" , marginRight:"7px"}} id="standard-basic" label="Title 2"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px"}} id="standard-basic" label="Link 2"></TextField>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Button variant="contained" color="primary" style={{marginTop:"20px"}}
                        onClick={disableClick(1)}>ADD ITEM</Button>
                    </Grid> */}
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px" , marginRight:"7px"}} id="standard-basic" label="Title 3"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField style={{marginTop:"30px"}} id="standard-basic" label="Link 3"></TextField>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Button variant="contained" color="primary" style={{marginTop:"20px"}}
                        onClick={disableClick(2)}>ADD ITEM</Button>
                    </Grid> */}
                </Grid>
                <p style={{textAlign:"center"}}>
                        <Button style={{marginTop:"30px"}} variant="contained" >Create Tree</Button>
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
