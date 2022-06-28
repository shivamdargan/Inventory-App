const express = require("express");
const envConfig = {
  path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
};
require("dotenv").config(envConfig);
const cors = require("cors");
const path = require("path");
const app = express();
require("./database/dbConfig");

//Requiring Models 
require('./database/models/User')
require('./database/models/Product')

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");

const userRoutes = require("./routes/user")
const productRoutes = require ('./routes/product')

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server started at port ${process.env.PORT} `)
})

app.use(userRoutes);
app.use(productRoutes);


// Production Setup _ Deployment
if (process.env.NODE_ENV === "production") {
  console.log("prod");
  
  app.use(express.static(path.resolve(__dirname, "client","build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });

  process.on("uncaughtException", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });
}
