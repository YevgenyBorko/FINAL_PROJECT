const mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/AS-metaData', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
    console.log("Database error:" + err);
});

