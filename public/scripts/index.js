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
  const Http3 = new XMLHttpRequest();
  const url = "/task-status";
  Http3.open("POST", url);
  Http3.setRequestHeader("Content-Type", "application/json");
  Http3.send(JSON.stringify({ body: { work: li.innerText, status: state } }));
}

function newelement() {
  var li = document.createElement("li");
  var label = document.createElement("label");
  var checkbox = document.createElement("input");
  const button = document.createElement("button");

  button.innerText = "edit";
  button.className = "button";
  button.onclick = editTask;

  checkbox.type = "checkbox";
  checkbox.onclick = printStatus;

  var inputvalue = document.getElementById("myinput").value;
  var textnode = document.createTextNode(inputvalue);

  label.className = "tasks";
  li.className = "listitem";
  label.appendChild(checkbox);
  label.appendChild(textnode);
  li.appendChild(label);
  li.appendChild(button);

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
  Http.send(JSON.stringify({ body: { work: inputvalue, status: false } }));
}

function renderTask(task) {
  var li = document.createElement("li");
  var label = document.createElement("label");
  var checkbox = document.createElement("input");
  const button = document.createElement("button");

  var textnode = document.createTextNode(task.work);
  var span = document.createElement("span");
  var close = document.createTextNode("\u2715");

  button.innerText = "edit";
  button.className = "button";
  button.onclick = editTask;

  checkbox.type = "checkbox";
  checkbox.checked = task.status;
  checkbox.onclick = printStatus;

  label.className = "tasks";
  label.appendChild(checkbox);
  label.appendChild(textnode);

  span.className = "close";
  span.appendChild(close);
  span.onclick = remove;

  li.className = "listitem";
  li.appendChild(label);
  li.appendChild(button);
  li.appendChild(span);
  document.getElementById("list_of_things_to_do").appendChild(li);
}

function fetchAllTasks() {
  const Http1 = new XMLHttpRequest();
  const url = "/retrive_data";
  Http1.open("GET", url);
  Http1.send();
  Http1.onreadystatechange = (event) => {
    if (Http1.readyState === XMLHttpRequest.DONE) {
      const retrived_tasks = Http1.responseText;
      const arr = JSON.parse(retrived_tasks);
      arr.forEach(renderTask);
    }
  };
}


function editTask(event) {
  const ul = event.currentTarget.parentElement.parentElement;
  const li = event.currentTarget.parentElement;
  var label = li.firstChild;
  const errdata = label.innerText;
  const checkbox = label.firstChild;
  const state = checkbox.checked;
  const editdata = document.createElement("input");
  const updatebutton = document.createElement("button");
  
  editdata.type = "text";
  updatebutton.innerText = "update";
  editdata.value = errdata;
  
  
  li.appendChild(editdata);
  li.appendChild(updatebutton);

  li.removeChild(li.firstChild);
  li.removeChild(li.firstChild);
  li.removeChild(li.firstChild);
  console.log(checkbox.checked)



  function update() {
    li.removeChild(li.firstChild); //removing input element
    li.removeChild(li.firstChild); //removing update button
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    const button = document.createElement("button");
  
    var textnode = document.createTextNode(editdata.value);
    var span = document.createElement("span");
    var close = document.createTextNode("\u2715");
  
    button.innerText = "edit";
    button.className = "button";
    button.onclick = editTask;
  
    checkbox.type = "checkbox";
    checkbox.checked = state;
    
  
    label.className = "tasks";
    label.appendChild(checkbox);
    label.appendChild(textnode);
  
    span.className = "close";
    span.appendChild(close);
  

    li.className = "listitem";
    li.appendChild(label);
    li.appendChild(button);
    li.appendChild(span);

    const Http = new XMLHttpRequest();
    const url = "/edittask";
    Http.open("POST", url);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify({ body: { previous_work:errdata , edited_work: editdata.value } }));
   }
   
  updatebutton.onclick = update;
 
}

fetchAllTasks();
