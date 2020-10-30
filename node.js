const bodyParser = require("body-parser");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/Addtask", function (req, res) {
  //console.log( req.body.body);
  const existing = fs.readFileSync("./tasks.json", "utf-8");
  const obj = JSON.parse(existing);
  //console.log(obj)
  obj.push(req.body.body);
  fs.writeFileSync("./tasks.json", JSON.stringify(obj, null, 2));
  res.write(JSON.stringify(req.body));
  res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started port on ${PORT}`);
});

function readfiledata() {
  let rawdata = fs.readFileSync("tasks.json");
  let previous_things = JSON.parse(rawdata);
  var data_to_render = [];
  for (let i = 0; i < previous_things.length; i++) {
    data_to_render.push(Object.values(previous_things[i]));
  }
  return data_to_render;
}

app.get("/retrive_data", (req, res) => {
  res.write(JSON.stringify(readfiledata()));
  res.end();
});
app.post("/removetask", function (req, res) {
  const data = req.body.body;
  const existing = fs.readFileSync("./tasks.json", "utf-8");
  const dataArray = JSON.parse(existing);
  dataArray1 = [];
  for (let i = 0; i < dataArray.length; i++){
    if(dataArray[i].work != data.work){
       dataArray1.push(dataArray[i]);
    }
  }
  fs.writeFileSync("./tasks.json", JSON.stringify(dataArray1, null, 2));
  res.end();
});

app.post('/task-status',(req,res) =>{
  console.log(req.body.statusbody);
  console.log(req.body.taskbody)
 
})
