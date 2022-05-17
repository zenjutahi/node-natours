const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tours = require('./../../models/tourModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// READ FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// IMPORT DATA
const importData = async () => {
  try {
    await Tours.create(tours);
    console.log('Data successfully imported!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tours.deleteMany();
    console.log('Data successfully deleted form DB');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
