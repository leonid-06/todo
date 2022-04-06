let addMessage=document.querySelector(".message"),
    addBotton = document.querySelector(".add"),
    todo=document.querySelector(".todo");

let todoList = [];

if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem("todo"));
    displayMessages();
}

addBotton.addEventListener("click", ()=>{
    if(!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important:false,
    }
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem("todo",JSON.stringify(todoList));
    addMessage.value="";
});

function displayMessages(){
    let displayMessage="";
    todoList.forEach((el,i)=>{
        displayMessage+=`
        <li>
            <input type="checkbox" id="intem_${i}" ${(el.checked) ? "checked": ""}>
            <label for="intem_${i}" class="${el.important ? "important": ""}">${el.todo}</label>
        </li>        
        `;
    })
    todo.innerHTML = displayMessage;
}

todo.addEventListener("change", (event)=>{
    let atr = event.target.getAttribute("id");
    let label = document.querySelector(`[for=${atr}]`);
    let valueLabel = label.innerHTML;
    todoList.forEach(el=>{
        if(el.todo === valueLabel){
            el.checked = !el.checked;
            localStorage.setItem("todo",JSON.stringify(todoList));
        }
    })
})

todo.addEventListener("contextmenu", event=>{
    event.preventDefault();
    todoList.forEach((item,i)=>{
        if (item.todo === event.target.innerHTML){
            if (event.ctrlKey){
                todoList.splice(i,1);
            } else{
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem("todo",JSON.stringify(todoList));
        }
    })
})



