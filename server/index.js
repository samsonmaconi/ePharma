const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginRegisterRoute = require('./routes/login-register-routes');

const PORT = 1234;
const DB_URI = "mongodb+srv://epharma_admin:epharma_admin@cluster0-me8ny.mongodb.net/epharma?retryWrites=true";
const MONGOOSE_OPTIONS = {
  useNewUrlParser: true
}

mongoose.Promise = Promise;
mongoose.connect(DB_URI, MONGOOSE_OPTIONS)
.then(() => console.log("Database Connected"));

const Product = require('./models/products');
app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials: true
}));
app.use(bodyParser.json());
app.use("/api/user",loginRegisterRoute);
app.get('/api/products', async(req, res) => {
  data = await Product.find();
  res.send(data);
  console.log('/api/products' + ' response sent');
});

app.listen(PORT, () => console.log("Server listening at port: " + PORT));
