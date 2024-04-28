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
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("fakestore_catalog");
      const products = await collection.find({}).toArray();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).send("Internal Server Error");
    }
  });


  app.listen(port, () => {
    console.log(`Server listening at http://${host}:${port}`);
  });