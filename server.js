const express = require('express'); //import express app
var session = require('express-session')
const app = express(); //instanciate express app
const path = require('path');
const router = express.Router();


app.use(express.urlencoded({ extended: true }));
const port = 3030; //listening to port 3000
const fs = require('fs');


app.use(express.static('public'));
app.use('/', router);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'einhorn chat',
    resave: false,
    saveUninitialized: true
  }))

  
 
app.post('/login', function (req, res, next){
    console.log('Got body:', req.body);
    req.session.username = req.body.name;
    
    res
    .status(201)
    .redirect(301, '/home')

});

// post logout

// get chats


// post chat


// file logic
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



// routes

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/pages/index.html'));

});
  
router.get('/home',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/home.html'));
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
    console.log(`Example app listening at http://localhost:${port}`)
  });