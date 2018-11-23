const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const fileUpload = require('express-fileupload');
var home = require('./routes/homepage');

app.use(cors());


app.use(fileUpload());
app.post('/upload', function (req, res) {
    console.log(req.files)
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.file;
    console.log(req.files)
    file.mv('./public/log/' + file.name, function (err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

app.use('/home', home)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))