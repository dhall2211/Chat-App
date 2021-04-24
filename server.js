const express = require('express'); //import express app
var session = require('express-session')
const app = express(); //instanciate express app
const path = require('path');
const router = express.Router();
const { json } = require('express')


app.use(express.urlencoded({ extended: true }));
const port = 3030; //listening to port 3000
const fs = require('fs');

app.use(session({
    secret: 'einhorn chat',
    resave: false,
    saveUninitialized: true
  }))

  app.use(function (req, res, next) {
      console.log("app.use " + req.body)
    //if (!req.session.username) {
    //  req.session.username = {}
    //}json
   
    //var name = req.body.name;
    // count the views
    //req.session.username = name;

    next();
  });


app.use('/', router);
app.use(express.static('public'));

//router.get('/', function(req, res){
//    res.sendFile(path.join(__dirname + '/test.html'));
//});


   
router.get('/sessiontest', function(req, res, next){
    if (!req.session.username){
        res
        .status(201)
        .redirect(301, '/')
    }
    res.send('your username: ' + req.session.username)
}

)


router.post('/login', function (req, res, next){
    console.log('Got body:', req.body);
    req.session.username = req.body.name;
    
    res
    .status(201)
    .redirect(301, '/sessiontest')

});


function createFile(name) {
    fs.appendFile(`${name}.txt`, name, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
};


function searchAndCreateFile(name) {
    const path = `./${name}.txt`

    try {
        if (fs.existsSync(path)) {
            createSession(name);

        } else {
            createFile(name);
            createSession(name);
        }

    } catch (err) {
        console.error(err)

    }
}


function createSession(name) {
    console.log("Session created")
}




// routes

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/test.html'));

});
  
router.get('/home',function(req,res){
    res.sendFile(path.join(__dirname+'/home.html'));
  });




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });