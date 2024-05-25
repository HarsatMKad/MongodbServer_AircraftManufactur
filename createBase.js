const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const mongoClient = new MongoClient(url);

async function createBase() {
  var empList = [];
  var enginList = [];
  var testersList = [];
  var testlabList = [];
  var workshopList = [];
  var areaList = [];
  var brigadeList = [];
  var productList = [];
  var worksList = [];
  var testList = [];

  var mongo = require("mongodb");

  //цеха
  for (var i = 0; i < 6; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);

    const workshop = {
      _id: Id,
      number: i + 1,
      lab_id: null
    }
    workshopList.push(workshop)
  }

  //лаборатории
  for (var i = 0; i <= 20; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);

    var wid = workshopList[Math.floor(Math.random() * 6)]

    const lab = {
      _id: Id,
      workshop: wid
    }
    testlabList.push(lab)
  }

  //работники
  for (var i = 0; i <= 120; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const empId = new mongo.ObjectId(timestamp);

    var day = Math.floor(Math.random() * 25) + 1
    var month = Math.floor(Math.random() * 10) + 1
    var d = month + "/" + day.toString() + "/2024"
    var s = Math.floor(Math.random() * 10000) + 1000

    const emp = {
      _id: empId,
      name: "NameEmp" + i.toString(),
      lastname: "lastnameEmp" + i.toString(),
      start_date: new Date(d),
      salary: s
    }

    empList.push(emp);
  }

  //испытатели
  for (var i = 0; i <= 50; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);

    var emp = empList[i + 50]
    var lab = testlabList[Math.floor(Math.random() * 20)]

    const tester = {
      _id: Id,
      emp: emp,
      lab: lab
    }
    testersList.push(tester)
  }

  //участки
  for (var i = 0; i <= 20; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);

    var worksop = workshopList[Math.floor(Math.random() * 6)]
    var emp = empList[Math.floor(Math.random() * 120)]

    const area = {
      _id: Id,
      number: Math.floor(Math.random() * 4) + 1,
      shief: emp,
      workshop: worksop
    }
    areaList.push(area)
  }

  //бригады
  for (var i = 0; i <= 40; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);
    var area = areaList[Math.floor(Math.random() * 20)]

    const brigad = {
      _id: Id,
      brigadier_id: null,
      area: area
    }

    brigadeList.push(brigad)
  }

  //инженеры
  var typs = ["builder", "turner", "mechanic", "welder", "welder", "technician"];
  for (var i = 0; i <= 50; i++) {
    var emp = empList[i]
    var type = typs[Math.floor(Math.random() * typs.length)];
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);
    var brigade = brigadeList[Math.floor(Math.random() * 40)]

    const enginer = {
      _id: Id,
      type: type,
      emp: emp,
      brigade: brigade
    }

    enginList.push(enginer)
  }

  //добавить бригадиров
  for (var i = 0; i <= 40; i++) {
    brigadeList[i].brigadier_id = enginList[Math.floor(Math.random() * enginList.length)]._id
  }

  //добавить лаборатории
  for (var i = 0; i < 6; i++) {
    workshopList[i].lab_id = testlabList[Math.floor(Math.random() * testlabList.length)]._id
  }

  //работы
  for (var i = 0; i < 500; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);

    areaId = areaList[Math.floor(Math.random() * areaList.length)]._id;
    var day = Math.floor(Math.random() * 25) + 1
    var month = Math.floor(Math.random() * 10) + 1
    var wDate = month + "/" + day.toString() + "/2024"

    const work = {
      _id: Id,
      work_name: "work" + i.toString(),
      work_date: new Date(wDate),
      area_id: areaId
    }

    worksList.push(work)
  }

  //испытания
  var equip = ["equip1", "equip2", "equip3", "equip4", "equip5", "equip6", "equip7", "equip8", "equip9", "equip10", "equip11", "equip12", "equip13", "equip14", "equip15",
    "equip16", "equip17", "equip18", "equip19", "equip20", "equip21", "equip22", "equip23", "equip24", "equip25", "equip26", "equip27", "equip28", "equip29", "equip30"]
  for (var i = 0; i < 500; i++) {
    myDate = new Date()
    timestamp = Math.floor(myDate / 1000);
    const Id = new mongo.ObjectId(timestamp);

    areaId = areaList[Math.floor(Math.random() * areaList.length)]._id;
    testerId = testersList[Math.floor(Math.random() * testersList.length)]._id;
    labId = testlabList[Math.floor(Math.random() * testlabList.length)]._id;
    equipment = equip[Math.floor(Math.random() * equip.length)];
    var day = Math.floor(Math.random() * 25) + 1
    var month = Math.floor(Math.random() * 10) + 1
    var wDate = month + "/" + day.toString() + "/2024"

    const test = {
      _id: Id,
      tester_id: testerId,
      test_name: "test" + i.toString(),
      test_date: new Date(wDate),
      equipment: equipment,
      lab_id: labId
    }

    testList.push(test)
  }

  //изделия
  var prodTyps = ["type1", "type2", "type3", "type4", "type5", "type6", "type7", "type8", "type9", "type10"]
  var att = ["attribut1", "attribut2", "attribut3", "attribut4", "attribut5", "attribut6", "attribut7", "attribut8", "attribut9", "attribut10",
    "attribut11", "attribut12", "attribut13", "attribut14", "attribut15", "attribut16", "attribut17", "attribut18", "attribut19", "attribut20"];
  var cl = 0
  var cw = 0
  for (var i = 0; i < 50; i++) {
    var type = prodTyps[Math.floor(Math.random() * prodTyps.length)];
    var rand = Math.floor(Math.random() * att.length)
    var atrb = []

    if (rand <= att.length - 3) {
      atrb.push(att[rand]);
      atrb.push(att[rand + 1]);
      atrb.push(att[rand + 2]);
    } else {
      atrb.push(att[rand]);
    }

    var d = null
    var brigade = null
    var workshop = workshopList[Math.floor(Math.random() * workshopList.length)];
    var ready = Math.random()
    if (ready < 0.5) {
      var areaArray = []
      var brigadeArray = []
      for (var j = 0; j < areaList.length; j++) {
        if (areaList[j].workshop == workshop) {
          areaArray.push(areaList[j])
        }
      }

      for (var j = 0; j < brigadeList.length; j++) {
        for (var k = 0; k < areaArray.length; k++) {
          if (brigadeList[j].area == areaArray[k]) {
            brigadeArray.push(brigadeList[j])
          }
        }
      }

      brigade = brigadeArray[Math.floor(Math.random() * brigadeArray.length)]._id;
    } else {
      var day = Math.floor(Math.random() * 25) + 1
      var month = Math.floor(Math.random() * 10) + 1
      d = new Date(month + "/" + day.toString() + "/2024")
    }

    workL = []
    var wCount = (Math.floor(Math.random() * 10) + 1) + cl
    for (var j = cl; j < wCount; j++) {
      workL.push(worksList[j])
      cl += 1
    }

    testL = []
    var lCount = (Math.floor(Math.random() * 10) + 1) + cw
    for (var j = cw; j < lCount; j++) {
      testL.push(testList[j])
      cw += 1
    }

    const product = {
      name: "product" + i.toString(),
      type: type,
      specific_type: type + "." + (Math.floor(Math.random() * 4) + 1).toString(),
      attributes: atrb,
      creation_date: d,
      brigade_id: brigade,
      workshop: workshop,
      works_list: workL,
      tests_list: testL
    }

    productList.push(product)
  }

  try {
    await mongoClient.connect();
    const db = mongoClient.db("AircraftManufactur");

    collection = db.collection("workshops")
    collection.drop();
    for (let item of workshopList) {
      await collection.insertOne(item);
    }

    collection = db.collection("test_lab")
    collection.drop();
    for (let item of testlabList) {
      await collection.insertOne(item);
    }

    var collection = db.collection("employees");
    collection.drop();
    for (let item of empList) {
      await collection.insertOne(item);
    }

    collection = db.collection("engineers")
    collection.drop();
    for (let item of enginList) {
      await collection.insertOne(item);
    }

    collection = db.collection("testers")
    collection.drop();
    for (let item of testersList) {
      await collection.insertOne(item);
    }

    collection = db.collection("plots")
    collection.drop();
    for (let item of areaList) {
      await collection.insertOne(item);
    }

    collection = db.collection("brigades")
    collection.drop();
    for (let item of brigadeList) {
      await collection.insertOne(item);
    }

    collection = db.collection("products")
    collection.drop();
    for (let item of productList) {
      await collection.insertOne(item);
    }

    collection = db.collection("works")
    collection.drop();
    for (let item of worksList) {
      await collection.insertOne(item);
    }

    collection = db.collection("tests")
    collection.drop();
    for (let item of testList) {
      await collection.insertOne(item);
    }

  } catch (err) {
    console.log(err);
  } finally {
    await mongoClient.close();
  }
  console.log("Base created")
}

createBase()