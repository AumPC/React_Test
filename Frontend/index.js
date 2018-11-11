const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(cors());

app.get('/', (req, res) => {
	res.send('root page');
});
app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});