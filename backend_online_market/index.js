const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./api/routers/user.router');
const categoryRouter = require('./api/routers/category.router');
const producerRouter = require('./api/routers/producer.router');
const itemRouter = require('./api/routers/item.router');
const shopRouter = require('./api/routers/shop.router');
const commentRouter = require('./api/routers/comment.router');
const billRouter = require('./api/routers/bill.router');
const cartRouter = require('./api/routers/cart.router');
const adminRouter = require('./api/routers/admin.router');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster0.wdrwi.mongodb.net/database_online_market');

// test();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors())

userRouter(app);
categoryRouter(app);
producerRouter(app);
itemRouter(app);
shopRouter(app);
commentRouter(app)
billRouter(app);
cartRouter(app);
adminRouter(app);
app.get('/', (req, res) => {res.send('Welcome to Online Market!')})

app.listen(port, () => console.log("server running on port " + port));