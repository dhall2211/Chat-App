const express = require('express'); //import express app
const app = express(); //instanciate express app
//const bodyParser = require('body-parser');
//const cors = require('cors');
const path = require('path');
const router = express.Router();

//app.use(bodyParser.urlencoded({ extended: true }));
const port = 3030; //listening to port 3000
const fs = require('fs');

//const name = "karl";
//searchFile(name);


router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/test.html'));
});


app.post('/login', function (req, res){
    console.log('Got body:', req);
    res.sendStatus(200);

});





function createFile(name) {
    fs.appendFile(`${name}.txt`, name, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
};


function searchFile(name) {
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
  res.sendFile(path.join(__dirname+'/index.html'));

});
  
router.get('/home',function(req,res){
    res.sendFile(path.join(__dirname+'/home.html'));
  });

app.use('/', router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });