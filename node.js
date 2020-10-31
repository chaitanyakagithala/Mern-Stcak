const bodyParser = require("body-parser");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

function readfiledata() {
  let rawdata = fs.readFileSync("tasks.json");
  return JSON.parse(rawdata);
}

app.post("/Addtask", function (req, res) {
  const existing = fs.readFileSync("./tasks.json", "utf-8");
  const obj = JSON.parse(existing);
  obj.push(req.body.body);
  fs.writeFileSync("./tasks.json", JSON.stringify(obj, null, 2));
  res.write(JSON.stringify(req.body));
  res.end();
});

app.get("/retrive_data", (req, res) => {
  res.write(JSON.stringify(readfiledata()));
  res.end();
});

app.post("/removetask", function (req, res) {
  const data = req.body.body;
  const existing = fs.readFileSync("./tasks.json", "utf-8");
  const dataArray = JSON.parse(existing);
  dataArray1 = [];
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].work != data.work) {
      dataArray1.push(dataArray[i]);
    }
  }
  fs.writeFileSync("./tasks.json", JSON.stringify(dataArray1, null, 2));
  res.end();
});

app.post("/task-status", (req, res) => {
  const status = req.body.body;
  const existing = fs.readFileSync("./tasks.json", "utf-8");
  const dataArray = JSON.parse(existing);

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].work === status.work) {
      dataArray[i].status = status.status;
    }
  }
  fs.writeFileSync("./tasks.json", JSON.stringify(dataArray, null, 2));
  res.end();
});
app.post("/edittask", (req, res) => {
  const data = req.body.body;
  const existing = fs.readFileSync("./tasks.json", "utf-8");
  const dataArray = JSON.parse(existing);

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].work === data.previous_work) {
      dataArray[i].work = data.edited_work;
    }
  }
  fs.writeFileSync("./tasks.json", JSON.stringify(dataArray, null, 2));

  res.end;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started port on ${PORT}`);
});
