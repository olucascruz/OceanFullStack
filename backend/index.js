const express = require('express');
const {MongoClient, ObjectId} = require("mongodb");
const cors = require("cors");
require("dotenv").config();


console.log("token", process.env.URL_BANCO)

const url = process.env.URL_BANCO;
const dbName = "jornada_fullstack_lca";

async function main(){

  console.log("conectando com o db");
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("acollection");
  console.log("db conectado!");

  const app = express();
  app.use(cors());
// Sinalizar o uso de JSON no body 
  app.use(express.json());
  app.get('/', function (req, res) {
    res.send('Hello, World!!!!!!!!');
  })

  app.get('/oi', function (req, res) {
      res.send('Hello, Borld!!!!!!!!');
    })

    const lista = [
      {
        id: 1,
        nome:"Seniorite",
        pontos: 90
      },
      {
        id:2,
        nome:"Estrele",
        pontos: 66
      },
      {
        id:3,
        nome:"Bobe",
        pontos: 78
      }
    ]

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
      const item = req.body;
      // console.log(item);

      //Adicionar o item na lista
      // lista.push({
      //   id:lista.length+1,
      //   nome: item.nome,
      //   pontos: item.pontos
      // });

      await collection.insertOne(item);

      res.send(item)
    });

    app.delete("/pontuacoes", async function(req, res){
      const item = req.body;
      // console.log(item);

      //Adicionar o item na lista
      // lista.push({
      //   id:lista.length+1,
      //   nome: item.nome,
      //   pontos: item.pontos
      // });

      // await collection.remove(item);

      res.send(item)
    });

  app.listen(process.env.PORT || 3333, ()=>{
    console.log("Aplicação rodando em http://localhost:3333")
  });
}

main()