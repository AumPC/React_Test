const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
var home = require('./routes/homepage');

app.use(cors());


app.use('/home', home)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))