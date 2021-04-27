const express = require('express'); //import express app
var session = require('express-session') //for session handling
const app = express(); //instanciate express app
const path = require('path'); // path handling
const router = express.Router(); //for route handling



app.use(express.json()); //json capabilities

app.use(express.urlencoded({
    extended: true
})); // parses incoming requests with urlencoded payload

const port = 3030; //listening to port 3000
const fs = require('fs'); //for file handling

app.use(express.static('public'));
app.use('/', router);

app.use(session({
    secret: 'einhorn chat',
    resave: false,
    saveUninitialized: true
}))

const chats = [];

app.post('/login', function (req, res, next) {
    console.log('Got body:', req.body);
    req.session.username = req.body.name;

    res
        .status(201)
        .redirect(301, '/home')

});

// post logout

// get chats
app.get('/getChat', function (req, res) {
    res.json(chats);
    }
);

// post chat
app.post('/sendChat', function (req, res, next) {
    //console.log('Cookies: ', req.cookies);
    console.log('The Body:', req.body);
    console.log('Session: ', req.session);

    const name = req.cookies.user;
    const msg = req.body.msg;
    const timestamp = Date.now();
    chats.push({
        'user': name,
        'msg': msg,
        'timestamp': timestamp
    })
    console.log(chats);
    res
        .status(200)
        .json(chats);

});




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

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));

});

router.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/home.html'));
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});