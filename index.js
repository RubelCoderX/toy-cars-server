const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 4000;

// middleWare
app.use(cors());
app.use(express.json());
// database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oacx6en.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const remoteCollection = client.db("toyCars").collection("remotes");
    const educationalCollection = client
      .db("toyCars")
      .collection("educationals");
    const modelCollection = client.db("toyCars").collection("models");
    // data load for remote-car
    app.get("/remotes", async (req, res) => {
      const cursor = remoteCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // data load for educational-car
    app.get("/educationals", async (req, res) => {
      const cursor = educationalCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // data load for model-car
    app.get("/models", async (req, res) => {
      const cursor = modelCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("toy cars running");
});

app.listen(port, () => {
  console.log(`toy cars running on port ${port}`);
});
