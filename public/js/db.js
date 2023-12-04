
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  import {getFirestore, collection, getDoc, getDocs, onSnapshot, addDoc, deleteDoc, updateDoc, doc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBNjErfi5ptobxbtAzuWIT_eqDkPg9Dlc8",
    authDomain: "dndcharacter-1d861.firebaseapp.com",
    projectId: "dndcharacter-1d861",
    storageBucket: "dndcharacter-1d861.appspot.com",
    messagingSenderId: "353429931818",
    appId: "1:353429931818:web:b94e40c6b2a779646cc053",
    measurementId: "G-VK3QR064W2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

async function getTasks(db) {
    const tasksCol = collection(db, "characters");
    const taskSnapshot = await getDocs(tasksCol);
    const taskList = taskSnapshot.docs.map((doc) => doc);//doc.data()
    return taskList;
  }

  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.log("Persistence Failed!");
      } else if (err.code == 'unimplemented') {
        //The current browser does not support all of the features required to enabled persistence
        console.log("Persistence is not valid");
      }
    });

const unsub = onSnapshot(collection(db, "characters"), (doc)=>{
//    console.log(doc.docChanges());
    doc.docChanges().forEach((change)=> {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === "added"){
            onAuthStateChanged(auth, (user) => 
            {
              if(user){
                renderTask(change.doc.data(), change.doc.id, user.uid);
              }
            });
        }
        if(change.type === "removed"){
            //do something
            removeTask(change.doc.id);
        }
    });
});

//if account is selected
const accountContainer = document.querySelector("#account_info");
accountContainer.addEventListener("click", async (event)=> {
  event.preventDefault();
  const modal = document.querySelector("#modal-account");
  M.Modal.getInstance(modal).open();
  const account = document.querySelector(".account-details");
  onAuthStateChanged(auth, (user) => {
    if(user){
      const html = `
      <h5>User Email:</h5>
      <p>${user.email}</p>
      <h5>User UID:</h5>
      <p>${user.uid}</p>
      `;
      account.innerHTML = html;
    }
  });
});


//delete and edit tasks
const taskContainer = document.querySelector(".tasks");
taskContainer.addEventListener("click", async (event)=> {
  if (event.target.textContent === 'delete_outline'){
  const id = event.target.getAttribute("data-id");
  const docRef = doc(db, "characters", id);
  const docSnap = await getDoc(docRef);
  deleteDoc(doc(db, "characters", id));
  characterDeletedNotification(docSnap.data().class, docSnap.data().level, docSnap.data().name, docSnap.data().race, docSnap.data().user);
}
if (event.target.textContent === 'edit'){
  const modal = document.querySelector("#modal-update-text");
  M.Modal.getInstance(modal).open();
  const id = event.target.getAttribute("data-id");
  const docRef = doc(db, "characters", id);
  const docSnap = await getDoc(docRef);
  const updateForm = document.querySelector("#update-data-form");
  document.querySelector("#update_name").value=docSnap.data().name;
  document.querySelector("#update_race").value=docSnap.data().race;
  document.querySelector("#update_class").value=docSnap.data().class;
  document.querySelector("#update_level").value=docSnap.data().level;
  updateForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const uc_name = updateForm["update_name"].value;
    const uc_race = updateForm["update_race"].value;
    const uc_class = updateForm["update_class"].value;
    const uc_level = updateForm["update_level"].value;
    try {
      await updateDoc(doc(db, "characters", id), {
        name: uc_name,
        race: uc_race,
        class: uc_class,
        level: uc_level
      });
      M.Modal.getInstance(modal).close();
      updateForm.reset();
      onAuthStateChanged(auth, (user) => {
        if(user){
          getTasks(db).then((snapshot) => {
            setupTasks(snapshot, user);
          });
        }
      });
      characterEditedNotification(docSnap.data().class, docSnap.data().level, docSnap.data().name, docSnap.data().race, docSnap.data().user);
    } catch (error) {
      console.error(error);
      M.Modal.getInstance(modal).close();
      updateForm.reset();
    }
  });
  //const id = event.target.getAttribute("data-id");
  /*await updateDoc(doc(db, "characters", id), {
    name: "CHANGED"
  });*/
}
})

//listen for auth status changes
onAuthStateChanged(auth, (user) => {
  if(user){
      getTasks(db).then((snapshot) => {
          setupTasks(snapshot, user);
      });
      setupUI(user);
      const form = document.querySelector("form[id='side-form-form']");
      form.addEventListener("submit", (event) => 
      {
        if (user)
        {
          event.preventDefault();
          characterCreatedNotification(form.c_class.value, form.c_level.value, form.c_name.value, form.c_race.value, user.uid);
          addDoc(collection(db, "characters"), {
              //title: form.title.value,
              //description: form.description.value
              user: user.uid,
              name: form.c_name.value,
              race: form.c_race.value,
              class: form.c_class.value,
              level: form.c_level.value
          }).catch((error) => console.log(error))
          form.c_name.value = "";
          form.c_race.value = "";
          form.c_class.value = "";
          form.c_level.value = "";
        }
        else{
          alert("No user");
          event.preventDefault();
        }
          
      });
  } else {
      console.log("User logged out");
      setupUI();
      setupTasks([]);
  }
});