const app = require('./app.js')

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/test');
  await mongoose.connect('mongodb+srv://nicoledhsu:RLriZ7QL64oOTTwK@cluster0.wjwjdfs.mongodb.net/?retryWrites=true&w=majority');
}

