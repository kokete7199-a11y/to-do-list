let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

function addTask(){
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if(text === "") return;

  tasks.push(text);
  input.value = "";
  saveTasks();
  showTasks();
} 
   
function deleteTask(index){
  tasks.splice(index,1);
  saveTasks();
  showTasks();
}    

function showTasks(){
  taskList.innerHTML = "";
  count.textContent = tasks.length;
  
  tasks.forEach((task,i)=>{
    taskList.innerHTML += `
      <li>
        ${task}
        <button onclick="deleteTask(${i})">X</button>
      </li>
    `;
  });
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

showTasks();
