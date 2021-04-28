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

let chats = [];

//populate chats array from file
try {
    const data = fs.readFileSync('./data/chats.json', 'utf8');
    // parse JSON string to JSON object
    chats = JSON.parse(data);
    // print all chats of loaded to console
    chats.forEach(chat => {
        console.log(`${chat.user}: ${chat.msg} at ${new Date(chat.timestamp).toUTCString()}`);
    });
} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}


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

    //const name = req.cookies.user;
    const user = req.body.user;
    const msg = req.body.msg;
    const timestamp = Date.now();
    chats.push({
        'user': user,
        'msg': msg,
        'timestamp': timestamp
    })

    //write chats to JSON file
    fs.writeFile('./data/chats.json', JSON.stringify(chats, null, 4), (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        }
    });

    console.log(chats);
    res
        .status(200)
        .json(chats);

});




// file logic
// function createFile(name) {
//     fs.appendFile(`${name}.txt`, name, function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
// }

// function searchAndCreateFile(name) {
//     path = `./${name}.txt`

//     try {
//         if (fs.existsSync(path)) {
//             createSession(name);

//         } else {
//             createFile(name);
//             createSession(name);
//         }

//     } catch (err) {
//         console.error(err)

//     }
// }



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