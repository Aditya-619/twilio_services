const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const router = require('./services/services');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URI);
  console.log("database connected");
}

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('server running on port', PORT);
});

