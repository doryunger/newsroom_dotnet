const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const router=express.Router();

const port=4200;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/news', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/news/', function (req, res) {	
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => console.log(`Server started on port ${port}`));