var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

  app.get("/products", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("product")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/:id", async (req, res) => {
  try {
      const productid = Number(req.params.id);
      console.log("product to find: ", productid);
      const query = {"id": productid };
      const result = await db.collection("product").findOne(query);
      if (!result){
          res.status(404).send("Not Found");
      }
      else {
          res.status(200).json(result);
      }
  }
  catch (error) {
      res.status(500).send("Internal Server Error");
  }
});

app.post("/addProducts", async (req, res) => {
  try {
      await client.connect();

      if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).send({ error: 'Bad request: No data provided.' });
      }

      const values = Object.values(req.body);
      const newDocument = {
          "id": values[0],
          "title": values[1],
          "price": values[2],
          "description": values[3],
          "category": values[4],
          "image": values[5],
          "rating": values[6],
      };

      const existingDoc = await db.collection("product").findOne({ "id": newDocument.id });
      if (existingDoc) {
          return res.status(409).send({ error: 'Conflict: a product with this ID already exists' });
      }

      const results = await db.collection("product").insertOne(newDocument);
      res.status(200).send(results);
  } catch (error) {
      console.error('Error adding new product:', error);
      res.status(500).send({ error: 'An internal server error occurred' });
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  try {
      const id = Number(req.params.id);

      await client.connect();
      console.log("product to delete: ", id);

      const query = {id: id};

      //delete
      const results = await db.collection("product").deleteOne(query);
      res.status(200);
      res.send(results);
  }
  catch (error) {
      console.error("Error deleting product: ", error);
      res.sendStatus(500).send({message: 'Internal Server Error'});
  }
});

app.put("/updateproduct/:id", async (req, res) => {
  const id = Number(req.params.id);
  const query = { id: id };
  await client.connect();
  console.log("product to Update :",id);
  // Data for updating the document, typically comes from the request body
  console.log(req.body);
  const updateData = {
  $set:{
  "title": req.body.title,
  "price": req.body.price,
  "description": req.body.description,
  "category": req.body.category,
  "image": req.body.image,
  "rating": req.body.rating
  }
  };
  // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
  const options = { };
  const results = await db.collection("product").updateOne(query, updateData, options);
  res.status(200);
  res.send(results);
  });


  app.listen(port, () => {
    console.log(`Server listening at http://${host}:${port}`);
  });