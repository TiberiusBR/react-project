import { Router } from 'express';
import user from './user.js'
import tree from './tree.js'

export default function (db){
    const routes = Router();

    routes.get('/teste',(req,res)=>{
        res.json({"res":"testinho certo"})
    })

    routes.use('/user', user(db))

    routes.use('/tree', tree(db))
    return routes
}