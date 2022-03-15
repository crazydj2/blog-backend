
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('access......');
    res.end('Test......');
});


// // [RUN SERVER]
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
 console.log("Express server has started on port " + port)
});

// // CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/test');

console.log('start......');
