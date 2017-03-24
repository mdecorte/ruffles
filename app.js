const express = require('express');
const app = express();
const provider = require('./provider.js');
// const router = express.Router();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/script'));

app.get('/', function(req, res) {
     res.render('index.html');
});


app.get('/vertrektijden', function(req, res) {
    provider.ennes(req.query, 'vertrektijden').then(data => {
        res.json(data);
    });
});

app.get('/storingen', function(req, res) {
    provider.ennes(req.query, 'storingen').then(data => {
        res.json(data);
    });
});

app.listen(3008, function() {
    console.log('Example app listening on port 3008!')
});
