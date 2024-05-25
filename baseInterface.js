const bodyParser = require('body-parser');
const express = require('express');
const app = express()

app.set('view engine', 'ejs')
app.set('views', './pages')

app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const mongoClient = new MongoClient(url);
const db = mongoClient.db("AircraftManufactur");

async function findByCollection(findCollection) {
  try {
    await mongoClient.connect();
    const collection = db.collection(findCollection);
    var cursor = await collection.find().toArray();
    await mongoClient.close();
    return await cursor
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

async function getBrigadier() {
  try {
    await mongoClient.connect();
    const collection = db.collection("brigades");
    var cursor = await collection.aggregate([{
      $lookup: {
        from: "engineers",
        localField: "brigadier_id",
        foreignField: "_id",
        as: "brigadier"
      }
    },
      {
        $project: {
          name: "$brigadier.emp.lastname"
        }
      }]).toArray();
    await mongoClient.close();
    return await cursor
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

async function getWorkshop() {
  try {
    await mongoClient.connect();
    const collection = db.collection("plots");
    var cursor = await collection.aggregate([{
      $group: {
        _id: "$workshop.number",
        plots: { $addToSet: "$number" }
      }
    }]).toArray();
    await mongoClient.close();
    return await cursor
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

async function getLabs() {
  try {
    await mongoClient.connect();
    const collection = db.collection("testers");
    var cursor = await collection.aggregate([{
      $group: {
        _id: "$lab._id",
        emps: { $addToSet: "$emp" },
        workshop: { $addToSet: "$lab.workshop" }
      }
    }]).toArray();
    await mongoClient.close();
    return await cursor
  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
}

app.get('/', (req, res) => {
  res.render('main')
})

app.get('/products', (req, res) => {
  (async () => {
    dataList = await findByCollection("products")
    res.render('prod', { data: dataList })
  })()
})

app.get('/brigades', (req, res) => {
  (async () => {
    dataList = await findByCollection("brigades")
    brigadierList = await getBrigadier()
    res.render('brigades', { data: dataList, data2: brigadierList })
  })()
})

app.get('/engineers', (req, res) => {
  (async () => {
    dataList = await findByCollection("engineers")
    res.render('eng', { data: dataList })
  })()
})

app.get('/labs', (req, res) => {
  (async () => {
    dataList = await getLabs()
    res.render('labs', { data: dataList })
  })()
})

app.get('/testers', (req, res) => {
  (async () => {
    dataList = await findByCollection("testers")
    res.render('testers', { data: dataList })
  })()
})

app.get('/workshops', (req, res) => {
  (async () => {
    dataList = await getWorkshop()
    res.render('workshops', { data: dataList })
  })()
})

const PORT = 2000
app.listen(PORT, () => {
  console.log('server is run at http://localhost:2000/')
})
