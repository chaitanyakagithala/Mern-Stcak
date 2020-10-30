function newelement() {
  var li = document.createElement("li");
  var label = document.createElement("label");
  var checkbox = document.createElement("input");

  checkbox.setAttribute("type", "checkbox");
  checkbox.onclick = printStatus;

  var inputvalue = document.getElementById("myinput").value;
  var textnode = document.createTextNode(inputvalue);

  label.className = "tasks";
  label.appendChild(checkbox);
  label.appendChild(textnode);
  li.appendChild(label);

  if (inputvalue === "") {
    alert("write something");
  } else {
    document.getElementById("list_of_things_to_do").appendChild(li);
  }
  document.getElementById("myinput").value = "";

  var span = document.createElement("span");
  var close = document.createTextNode("\u2715");
  span.className = "close";
  span.appendChild(close);
  span.onclick = remove;
  li.appendChild(span);

  const Http = new XMLHttpRequest();
  const url = "/Addtask";
  Http.open("POST", url);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify({ body: { work: inputvalue } }));
}

const Http1 = new XMLHttpRequest();
const url = "/retrive_data";
Http1.open("GET", url);
Http1.send();
Http1.onreadystatechange = (event) => {
  if (Http1.readyState === XMLHttpRequest.DONE) {
    const retrived_tasks = Http1.responseText;
    const arr = JSON.parse(retrived_tasks);
    for (var i = 0; i < arr.length; i++) {
      renderTask(arr[i]);
    }
  }
};

function renderTask(task) {
  var li = document.createElement("li");
  var label = document.createElement("label");
  var checkbox = document.createElement("input");
  // var inputvalue = task;
  var textnode = document.createTextNode(task);
  var span = document.createElement("span");
  var close = document.createTextNode("\u2715");

  checkbox.setAttribute("type", "checkbox");
  checkbox.onclick = printStatus;

  label.className = "tasks";
  label.appendChild(checkbox);
  label.appendChild(textnode);

  span.className = "close";
  span.appendChild(close);
  span.onclick = remove;

  li.appendChild(label);
  li.appendChild(span);
  document.getElementById("list_of_things_to_do").appendChild(li);
}

function remove(event) {
  const ul = event.currentTarget.parentElement.parentElement;
  const li = event.currentTarget.parentElement;
  const label = li.getElementsByTagName("label");
  const Http2 = new XMLHttpRequest();
  const url = "/removetask";
  Http2.open("POST", url);
  Http2.setRequestHeader("Content-Type", "application/json");
  Http2.send(
    JSON.stringify({
      body: {
        work: label[0].innerText,
      },
    })
  );
  ul.removeChild(li);
}

function printStatus(event) {
  const li = event.currentTarget.parentElement;
  const checked_value = event.currentTarget;
  const state = checked_value.checked;
  console.log(JSON.stringify({ body: { work: li.innerText } }));
  const Http3 = new XMLHttpRequest();
  const url = "/task-status";
  Http3.open("POST", url);
  Http3.setRequestHeader("Content-Type", "application/json");
  Http3.send(
    JSON.stringify({
      statusbody: {
        status: state,
      },
      taskbody: {
        work: li.innerText,
      },
    })
  );
}
