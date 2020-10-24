const bodyParser = require("body-parser");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));

 app.post('/contact', function(req, res){
    console.log(`data: ${req.body.body.work}`);
   const existing = fs.readFileSync('./tasks.json',"utf-8");
    const obj = JSON.parse(existing);
    obj.push(req.body.body);
    fs.writeFileSync('./tasks.json',JSON.stringify(obj));
    res.write(JSON.stringify(req.body));
    res.end();
  
 });
const PORT = process.env.PORT || 3000;
 app.listen(PORT,()=>{
    console.log(`server started port on ${PORT}`);

});