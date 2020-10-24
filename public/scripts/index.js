function newelement(){
    var li = document.createElement("li");
    var inputvalue = document.getElementById("myinput").value;
    var textnode  = document.createTextNode(inputvalue);
    li.appendChild(textnode);
   
    if(inputvalue===""){
        alert("write something")
    }
    else{
        document.getElementById("list_of_things_to_do").appendChild(li);   
    }
    document.getElementById("myinput").value = "";
    var span = document.createElement("span")
    var close = document.createTextNode("\u2715");
    span.className = "close";
    span.appendChild(close);
    span.setAttribute('onClick','alert("closing...")');
    li.appendChild(span);
    const Http = new XMLHttpRequest();
    const url='/contact';
    Http.open("POST", url);
    Http.setRequestHeader('Content-Type','application/json');
    Http.send(JSON.stringify({body:{work:inputvalue}}));

}
