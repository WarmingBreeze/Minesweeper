const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.options('*', cors());
app.use(cors());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000, () => console.log('Server starts on port 9000.'));