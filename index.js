import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var authered = false;


function auth(req,res,next){
    console.log(req.body);
    const password = req.body["password"];
    if(password == "helloo"){
        authered = true;
    }
    next();
}

app.use(auth)

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

app.post("/check",(req,res)=>{
    
   if(authered){
    res.sendFile(__dirname+"/public/secret.html");
   }
   else{
    res.sendFile(__dirname+"/public/index.html");
   }
})

app.listen(port,()=>{
    console.log("server is running..");
})