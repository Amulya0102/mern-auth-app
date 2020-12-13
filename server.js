//pulling in required dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
//const MongoClient = require('mongodb').MongoClient;
//initialising app using express
const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config,pulling in mongoURI from keys.js
const db = require("./config/keys").mongoURI;

// Connect to MongoDB(to our database)
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
   }
  )
  .then(() => console.log("MongoDB successfully connected"))
  //.catch(err => console.log(err));
  .catch((err)=>{
    console.log(`there is a problem with ${err.message}`);
    process.exit(-1)
});

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

  //setting port
  // process.env.port is Heroku's port,where app is to be deployed
  const port = process.env.PORT || 5000;
  //making app listen to our PORT
  app.listen(port, () => console.log(`Server up and running on port ${port} !`));
