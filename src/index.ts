import 'dotenv/config'
import express from "express"
import DBConnection from "./db/connect-db.js"
import { Request, Response, NextFunction, Errback } from 'express'

const app = express()
DBConnection()

app.get('/name',(req:Request, res:Response)=>{
    res.status(200).json({
        name:'Mussaddiq'
    })
})

app.use((
  err: { statusCode?: number; message?: string },
  _: Request,
  res: Response,
  _next: NextFunction 
) => {
   res.status(err.statusCode ?? 500).json({
    message: err.message ?? 'Something went wrong'
  })
})


app.listen(3000, ()=>{
    console.log("server is runing on port 3000")
})