const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 4000;
// middleware

app.use(cors());
app.use(express.json());

// v5i8kLOLOd2rwu0L
// KrishiDBUser

const uri =
  "mongodb+srv://KrishiDBUser:v5i8kLOLOd2rwu0L@cluster0.sgnnmzs.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const cropsDB = client.db("cropsDB");
    const cropsCollection = cropsDB.collection("crops");
    const usersCollection = cropsDB.collection("users");
    // crops api Get
    app.get("/crops", async (req, res) => {
      const result = await cropsCollection.find().toArray();
      res.send(result);
    });

    // crops api post
    app.post("/crops", async (req, res) => {
      const newCrops = req.body;
      const result = await cropsCollection.insertOne(newCrops);
      res.send(result);
      console.log(newCrops);
    });
    // crops details page
    app.get("/crops/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cropsCollection.findOne(query);
      res.send(result);
      console.log("need users with id", id);
    });
    // users api post
    app.post("/users", async (req, res) => {
      const newUsers = req.body;
      const result = await usersCollection.insertOne(newUsers);
      res.send(result);
      console.log(newUsers);
    });

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

app.listen(port, () => {
  console.log(`krishi server is running on port ${port}`);
});
