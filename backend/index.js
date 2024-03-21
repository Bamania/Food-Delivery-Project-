const express = require('express');
const app = express();
const mongoDB = require('./db');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Fixed "Access-Control-Allow-Headers" typo.
  next();
});

mongoDB();

const port = 5000;

app.use(express.json());

app.use('/api', require('./Routes/Createuser'));
app.use('/api', require('./Routes/DisplayData'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
