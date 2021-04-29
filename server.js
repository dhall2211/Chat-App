const express = require("express"); //import express app
var session = require("express-session");
const app = express(); //instanciate express app
const path = require("path");
const router = express.Router();
const fs = require("fs");
const port = 3030; //listening to port 3000

const UserService = require('./services/UserService');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);
app.use(express.urlencoded({ extended: true }));
// middleware cookie parser
app.use(( req, res, next) => {
    if(!req.headers.cookie) {
        req.cookie = {};
        return next();
    }
    const values = req.headers.cookie.split("; ");
    const cookieValues = {};
    values.forEach((cookieValue) => {
      const splitted = cookieValue.split("=");
      const key = splitted[0];
      const value = splitted[1];
      cookieValues[key] = value;
    });
    req.cookies = cookieValues;
    next();
});
// app.use(
//   session({
//     secret: "einhorn chat",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

let chats = [];

// try {
//   const data = fs.readFileSync("./data/chats.json", "utf8");
//   // parse JSON string to JSON object
//   chats = JSON.parse(data);
//   // print all chats of loaded to console
//   chats.forEach((chat) => {
//     console.log(
//       `${chat.user}: ${chat.msg} at ${new Date(chat.timestamp).toUTCString()}`
//     );
//   });
// } catch (err) {
//   console.log(`Error reading file from disk: ${err}`);
// }

app.post("/login", async (req, res, next) => {

    const vm = req.body.name;
    console.log(vm);
  try {
    const response = await UserService.createUser(vm);
    if(response.status) {
        res.cookie('user', response.name);
        //res.send(response.name);
        res.redirect('/home');
    }else{
        res.redirect('/')
        res.send('Sorry user name not correct')

    }
  } catch (err) {
      console.log(err);
      return res.render('/login', 'unable to login');
  }
});

// post logout
app.post("/logout", async (req, res) => {
  try {
 
    res.clearCookie("user");
    return res.redirect("/");
  } catch (error) {}
});

// get chats
app.get("/getChat", function (req, res) {
  res.json(chats);
});

// post chat

app.post("/sendChat", function (req, res, next) {
  const user = req.body.user;
  const msg = req.body.msg;
  const timestamp = Date.now();
  chats.push({
    user: user,
    msg: msg,
    timestamp: timestamp,
  });

  //writeChatsToJsonFile("./data/chats.json", chats);

  console.log(chats);
  res.status(200).json(chats);
});

//delete all Chat messages
app.get("/deleteAllMessages", function (req, res) {
  chats = [];
  writeChatsToJsonFile("./data/chats.json", chats);
  res.json(chats);
});

// function writeChatsToJsonFile(fpath, data) {
//   fs.writeFile(fpath, JSON.stringify(data, null, 4), (err) => {
//     if (err) {
//       console.log(`Error writing file: ${err}`);
//     }
//   });
// }

// file logic
// function createFile(name) {
//   fs.appendFile(`${name}.txt`, name, function (err) {
//     if (err) throw err;
//     console.log("Saved!");
//   });
// }

// function searchAndCreateFile(name) {
//   const path = `./${name}.txt`;

//   try {
//     if (fs.existsSync(path)) {
//       createSession(name);
//     } else {
//       createFile(name);
//       createSession(name);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// routes

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/index.html"));
});

router.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname + "/pages/home.html"));
});

router.get('/home.css',function(req,res){
    res.sendFile(path.join(__dirname+'/home.css'));
});

router.get('/public/main.css',function(req,res){
    res.sendFile(path.join(__dirname+'/'+req.url));
});

router.get('/img/*.png',function(req,res){
    res.sendFile(path.join(__dirname+'/'+req.url));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
