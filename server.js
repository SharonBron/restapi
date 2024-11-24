//yael-reifman-212322283-sharon-bronshteyn-325119063
require('dotenv').config(); // load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post_routes');
const commentRoutes = require('./routes/comment_routes');

const app = express();

// middleware
app.use(bodyParser.json());

// routes
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// connect to mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); //exit the process with a failure
    }
};

// start server
const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
