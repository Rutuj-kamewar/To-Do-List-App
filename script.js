const input = document.querySelector("#input-area");
const listContainer = document.querySelector(".list-container");
const completedTaskList = document.querySelector(".completed-task");

function addTask() {
  if (input.value === '') {
    alert("Add the task before clicking");
  } else {
    const li = document.createElement("li");
    li.innerHTML = input.value;

    const editBtn = document.createElement("i");
    editBtn.classList.add("fa-regular", "fa-pen-to-square");
    editBtn.addEventListener("click", function () {
      enableTaskEditing(li);
    });

    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-regular", "fa-check-circle");

    li.appendChild(editBtn);
    li.appendChild(checkIcon);
    

    checkIcon.addEventListener("click", function () {
      moveTaskToCompleted(li);
      li.appendChild(editBtn);
      li.removeChild(checkIcon);
      
    });

    listContainer.appendChild(li);

    input.value = "";
    saveData();
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
}, false);

function enableTaskEditing(liElement) {
  liElement.contentEditable = "true";
  liElement.focus();
}

function moveTaskToCompleted(liElement) {
  if (listContainer.contains(liElement)) {
    listContainer.removeChild(liElement);
    completedTaskList.appendChild(liElement);

    const cross = document.createElement("i");
    cross.classList.add("fa-regular", "fa-circle-xmark");

   liElement.appendChild(cross)
    saveData();
  }
}

completedTaskList.addEventListener("click", function (e) {
  if (e.target.tagName === "I" && e.target.classList.contains("fa-circle-xmark")) {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  localStorage.setItem("completedData" , completedTaskList.innerHTML)
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
  completedTaskList.innerHTML = localStorage.getItem("completedData");
}

showData();

// You can add a button or an event to call the clearData function
var btn = document.querySelector(".button-34");

btn.addEventListener("click", function () {
  listContainer.innerHTML = "";
  localStorage.clear();
  completedTaskList.innerHTML = ""
});
