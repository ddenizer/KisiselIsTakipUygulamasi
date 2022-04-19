 
 const form = document.querySelector("#todo-form");
 const todoInput= document.querySelector("#todo");
 const dataListValue=document.querySelector("#datalist");
 const todoList = document.querySelector(".list-group");
 const firstCardBody = document.querySelectorAll(".card-body")[0];
 const secondCardBody =document.querySelectorAll(".card-body")[1];
 const filter = document.querySelector("#filter");
 const clearButton = document.querySelector("#clearTodos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    secondCardBody.addEventListener("click",editItem);
    filter.addEventListener("keyup",filterTodos);
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const filterValue2 = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)=== -1 ||text.indexOf(filterValue2)=== -1 ){
            listItem.setAttribute("style","display : none ! important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });
}

function deleteTodo(e){
    if(e.target.className === "fa fa-trash btnCustom2 btn"){
        alert("Emin misiniz ?");
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Başarıyla silindi!");
    }
}
function editItem(e){
    if(e.target.className === "fa fa-pencil btnCustom2 btn"){
        alert("Emin misiniz  ?");
        showAlert("success", "Başarıyla güncellendi!");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });    
    localStorage.setItem("todos",JSON.stringify(todos));
}


function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}


function addTodo(e){
    const ListValue =dataListValue.value;
    const newTodo = todoInput.value.trim();
    console.log(newTodo);
    if(newTodo==="" || ListValue===""){
        showAlert("danger","Lütfen bir iş girin!");
    }
    else
    {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Başarıyla eklendi!");
    }
    todoInput.value="";
    ListValue.value="";
    e.preventDefault();

}
function getTodosFromStorage(){

    let todos;

    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className= `alert alert-${type}`;
    alert.textContent=message;

    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);
}

const btnDanger="<button class='btn btn-danger btnCustom'>Urgent</button>";
const btnWarning="<button class='btn btn-warning btnCustom'>Regular</button>";
const btnPrimary="<button class='btn btn-primary btnCustom'>Trivial</button>";
let btnEdit = "<div class='fa fa-pencil btnCustom2 btn '></div>"

function addTodoToUI(newTodo){

    const ListValue =dataListValue.value;
    const listItem = document.createElement("li"); 
    const link =document.createElement("a");
    
    listItem.className="delete-item";

    if(ListValue=="Urgent"){
        link.innerHTML = btnDanger + "<button class='fa fa-pencil btnCustom2 btn'></button>" + "<i class='fa fa-trash btnCustom2 btn'></i> "
    }
    else if(ListValue=="Regular"){
        link.innerHTML = btnWarning + "<button class='fa fa-pencil btnCustom2 btn'></button>" + "<i class='fa fa-trash btnCustom2 btn'></i> "
    }
    else{
        link.innerHTML = btnPrimary + "<button class='fa fa-pencil btnCustom2 btn'></button>" + "<i class='fa fa-trash btnCustom2 btn'></i> "
    }
    
    listItem.className ="list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    console.log(listItem);
}

        