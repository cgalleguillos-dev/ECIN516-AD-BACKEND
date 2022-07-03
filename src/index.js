const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@appdist-shard-00-00.izigz.mongodb.net:27017,appdist-shard-00-01.izigz.mongodb.net:27017,appdist-shard-00-02.izigz.mongodb.net:27017/?ssl=true&replicaSet=atlas-125ejv-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(uri, 
  { useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database");
}).catch((err) => {
  console.log(err);
});

mongoose.connection.on('connected', () =>
  console.log('Connected')
);
console.log(mongoose.modelNames());
app.set('port', 9000);

app.listen(app.get('port'), () => {
  console.log(`Hola ${app.get('port')}`)
});

app.use(require('./routes/product'));
app.use(require("./routes/user"));
// app.use("/users", require("./controllers/user/user.controller"));