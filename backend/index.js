const express = require('express');
const {MongoClient, ObjectId} = require("mongodb");
const cors = require("cors");
require("dotenv").config();


console.log("token", process.env.URL_BANCO)

const url = process.env.URL_BANCO;
const dbName = "ranking_db";

async function main(){

  console.log("conectando com o db");
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("ranking");
  console.log("db conectado!");

  const app = express();
  app.use(cors());
// Sinalizar o uso de JSON no body 
  app.use(express.json());
  

    //Endpoint READ ALL - [GET] /pontuacoes
    app.get("/pontuacoes", async function(req, res){
      try{
        if(!process.env.URL_BANCO){
          throw new Error ("Banco não conectado");
        }
        const itens = await collection
        .find()
        .sort({ pontos: -1 })
        .limit(10)
        .toArray();
        res.send(itens);
      }catch (err){
        next(err);
      }
    });

    //Endpoint CREATE - [POST] /pontuacoes
    app.post("/pontuacoes", async function(req, res){
      try{
        const item = req.body;
        if(item.name){
          await collection.insertOne(item);
        }

        res.status(201).send(item);
      }catch(error){
        res.status(500);  
      }
    });

    //Endpoint DELETE - [POST] /pontuacoes
    app.delete("/pontuacoes", async function(req, res){
      const item = req.body;

      await collection.remove(item);

      res.send(item)
    });

  app.listen(process.env.PORT || 3333, ()=>{
    console.log("Aplicação rodando em http://localhost:3333")
  });
}

main()