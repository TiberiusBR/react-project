import React, { useState } from 'react';
import {Container , TextField, Button, Link} from '@material-ui/core'
import '../style/login.css'
import axios from 'axios'

export default function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [nome, setNome] = useState();

    let createAccount = async () =>{
        try {
            var res = await axios.post("http://localhost:3333/user/criar-conta" , {email, nome , senha})
            window.location.href = "/"
            alert("Account created with success!")
        } catch (error) {
            alert("Something went wrong. ")
        }
    }

    return (
        <div className="gradient">
            <Container maxWidth="sm" >
                <h1 className="elemform">Register account 😀</h1>
                <form>
                    <TextField style={{marginTop:"20px"}} id="standard-basic" fullWidth label="nome" 
                    onChange={(e) => setNome(e.target.value)} />
                    <TextField style={{marginTop:"20px"}} id="standard-basic"
                     fullWidth label="email" onChange={(e) => setEmail(e.target.value)}/>
                    <TextField style={{marginTop:"20px"}} id="standard-basic" fullWidth label="senha" type="password"
                    onChange={(e) => setSenha(e.target.value)} />
                    <p style={{textAlign:"center"}}>
                        <Button style={{marginTop:"20px"}} variant="contained" onClick={createAccount}>Create Account</Button>
                    </p>
                </form>
            </Container>
        </div>
    )
}
