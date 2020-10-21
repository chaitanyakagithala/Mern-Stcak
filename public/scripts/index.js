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
}
function remove(){
var todolist = document.getElementsByTagName("li")
 for( var i=0;i<todolist.length;i++){
     var block = document.createElement("span")
     var closesymbol = document.createTextNode("close");
     block.appendChild(closesymbol);
     todolist[i].appendChild(block);
     console.log(i);
 }
}