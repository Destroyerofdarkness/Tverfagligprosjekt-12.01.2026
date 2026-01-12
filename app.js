const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.set(express.urlencoded({extended:true}));

const main_router = require("./routes/default_router.js")

app.use(main_router)

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
