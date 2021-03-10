import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Container , TextField, Button} from '@material-ui/core'
import '../style/login.css'
import axios from 'axios'

export default function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    let makeLogin = async () =>{
        try {
            var res = await axios.post("http://localhost:3333/user/login" , {email , senha})
            window.location.href = "/trees/" + email
        } catch (error) {
            alert("INVALID email/PASSWORD.")
        }
    }

    return (
        <div className="gradient">
            <Container maxWidth="sm" >
                <h1 className="elemform">Welcome to CloneTree. Please login before continuing.</h1>
                <form>
                    <TextField style={{marginTop:"20px"}} id="standard-basic"
                     fullWidth label="email" onChange={(e) => setEmail(e.target.value)}/>
                    <TextField style={{marginTop:"20px"}} id="standard-basic" fullWidth label="senha" type="password"
                    onChange={(e) => setSenha(e.target.value)} />
                    <p style={{textAlign:"center"}}>
                        <Button style={{marginTop:"20px"}} variant="contained" onClick={makeLogin}>Login</Button>
                    </p>
                    <p style={{textAlign:"center"}}>
                        <Link to="/signup">Don't have an account? Signup here.</Link>
                    </p>
                </form>
            </Container>
        </div>
    )
}
