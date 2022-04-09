
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { logger } from 'morgan';

import { initRouter } from './router/router.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));

initRouter(app);

// // [RUN SERVER]
const port = process.env.PORT || 8080;
app.listen(port, () => {
 console.log("Express server has started on port " + port)
});

// // CONNECT TO MONGODB SERVER
mongoose
    .connect('mongodb://localhost/blog-dj')
    .then(() => {
        console.log('mogodb connect success!!!')
    })
    .catch(e => {
        console.error('mogodb connect failed...');
        console.error(e);
    });

console.log('start......');
