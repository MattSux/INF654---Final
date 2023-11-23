// setup materialize components
document.addEventListener("DOMContentLoaded", function(){
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
})

const tasks = document.querySelector(".tasks");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
  //toggle UI elements
  if(user) {
    loggedOutLinks.forEach((item) => (item.style.display="none"));
    loggedInLinks.forEach((item) => (item.style.display="block"));
  } else {
    loggedOutLinks.forEach((item) => (item.style.display="block"));
    loggedInLinks.forEach((item) => (item.style.display="none"));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // Add Tasks
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});



//Populate data (when signed in)
const setupTasks = (data, user) => {
  let html = "";
  data.forEach((doc) => {
    const task = doc.data();
    // Get the document ID from the doc object
    const id = doc.id; // This line is added to define 'id'
    if (user.uid === task.user)
    {
      const li = `
      <div class="card-panel task white row" data-id="${id}">
          <img src="/img/task.png" alt="" class="responsive-img materialboxed">
          <div class="task-detail">
              <div class="task-title">${task.name}</div>
              <div class="task-description">${task.class}</div>
          </div>
          <div class="task-delete">
              <i class="material-icons" data-id="${id}">delete_outline</i>
              <i class="material-icons" data-id="${id}">edit</i>
          </div>
      </div>
      `;
      html += li;
    }
  });
  tasks.innerHTML = html;
};

const renderTask = (data, id, uid) => {
  if (uid === data.user)
    {
      const html = `
      <div class="card-panel task white row" data-id ="${id}">
                <img src="/img/task.png" class="responsive-img materialboxed" alt="">
                <div class="task-detail">
                    <div class="task-title">${data.name}</div>
                    <div class="task-description">${data.class}</div>
                </div>
                <div class="task-delete">
                    <i class="material-icons" data-id ="${id}">delete_outline</i>
                    <i class="material-icons" data-id="${id}">edit</i>
                </div>
            </div>
      `;
      tasks.innerHTML += html;
    }
    else{console.log("INVALID");}
};

//remove task from DOM
const removeTask = (id) => {
  const task = document.querySelector(`.task[data-id = '${id}']`)
  task.remove()
}