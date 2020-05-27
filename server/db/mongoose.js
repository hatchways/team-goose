const mongoose = require("mongoose");
const url = process.env.MONGOLAB_URI;
try {
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
    console.log('DB connected')
}
catch (err) {
    console.log('Failed to connect to DB', err)
}

module.exports = { mongoose };

