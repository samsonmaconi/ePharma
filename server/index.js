const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const loginRegisterRoute = require('./routes/login-register-routes');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

const PORT = 1234;
const DB_URI =
  'mongodb+srv://epharma_admin:epharma_admin@cluster0-me8ny.mongodb.net/epharma?retryWrites=true';
const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0
};

mongoose
  .connect(DB_URI, MONGOOSE_OPTIONS)
  .then(() => console.log('Database Connected'))
  .catch(ERR => console.log(ERR));

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/user",loginRegisterRoute);

app.listen(PORT, () => console.log('Server listening at port: ' + PORT));
