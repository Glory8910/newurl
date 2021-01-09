
let mongodb = require("mongodb")
let express = require('express');
let bodyparser = require('body-parser')
let mongoose = require('mongoose');
let urlExists = require('url-exists')
let cors = require("cors")

const app = express()
app.use(express.static('public'));
app.use(cors());
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.set("view engine", "ejs")
const port = 3000;
app.use(bodyparser.urlencoded({ extended: true }))


// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://glo:glory1@task.53uqt.mongodb.net/task?retryWrites=true&w=majority"



// // mongoose.set('useNewUrlParser', true);

// let dbname="urlproject";

// 

const { urlmodule } = require("./models/short")

var { nanoid } = require("nanoid");
var ID = nanoid(5);

app.get("/", function (req, res) {
  try {
    mongoose.connect("uri");

    let alldata = urlmodule.find(function (err, data) {

      res.render('home', { urls: data });
    })
  }
  catch {
    console.log(err)
  }
  finally {
    mongoose.disconnect();
  }
})



app.post("/create", (req, res) => {


  try {

    mongoose.connect("uri");
    console.log(req.body.longurl)

    urlExists(req.body.longurl, function (err, exists) {
      if (!exists) {
        console.log(exists, "ase")
        res.json({ "message": "try with correct url" })
      }
      else {
        console.log(exists, "ase"); // true
        var myurl = new urlmodule({
          longurl: req.body.longurl,
          shorturl: ID
        })
        myurl.save(function (err, data) {
          if (err) throw err
          console.log(data);
        });
        res.json({ "message": "got the name" })

      }

    });
    console.log(ID)


  }
  catch {
    console.log(error);
  }
  finally {
    mongoose.disconnect();
  }

})




app.get("/:shortner", async function (req, res) {
  try {
    await urlmodule.findOne({ shorturl: req.params.shortner }, async function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log(docs.longurl, docs.count)

        urlmodule.updateOne({ shorturl: req.params.shortner },
          { "$inc": { count: 1 } }, function (err, docs) {
            if (err) {
              console.log(err)
            }
            else {
              console.log("Updated Docs : ", docs);
            }
          });

        console.log(docs.count);


        console.log(req.params.shortner);
        await res.redirect(docs.longurl);
      }
    });

  }
  catch {
    console / log(error)
  }
  finally {
    mongoose.disconnect();
  }



})









app.listen(process.env.PORT || port)





// const { MongoClient } = require("mongodb");
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri ="mongodb+srv://glo:glory@cluster0.isiz1.mongodb.net/urllist?retryWrites=true&w=majority"
// // app.use(cors)
//



// 

// app.post('/val',async (req, res) => {

//   await mongoose.connect("mongodb://localhost:27017/myurl");
//   // res.send('Hello World!')
//   //  var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
//   // let connection=await MongoClient.connect("mongodb://localhost:27017",{ useUnifiedTopology: true });
//   let db=connection.db("urllist");
//   await db.collection("urlconvert").insertOne(req.body);
//   connection.close();
//   res.json({"message":"val is entered"})

// 