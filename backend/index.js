import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongodb'
import cors from 'cors'
import routes from './routes/routes.js'
import dotenv from 'dotenv'

//Used to access the environment variables.
dotenv.config()
//Creates an express instance, the app will be it's own server.
const app = express()
//...
app.use(cors())
//Used to say that json files will be used.
app.use(express.json())
//When you make POST requests,
app.use(bodyParser.json())

const mongoString = process.env.MONGOSTRING
const port = process.env.PORT
const dbname = process.env.DB_NAME
const { MongoClient } = mongoose
let db

mongoose.connect(mongoString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if(!err){
            db = client.db('dbname')
            app.use('/', routes(db))

            app.listen(port, () => {
                console.log(`Servidor ouvindo na porta ${port}`)
            })
            console.log("Mongo conectado")
        }
        else console.log('Erro ao conectar mongo: ',err.errmsg)
    })