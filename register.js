

// setting up firebase with our website
const firebaseApp = firebase.initializeApp({ 
  apiKey: "AIzaSyDdUw8WLg8oY5j9JPoZ8nBOQcQKYfxVrVU",
  authDomain: "fypsignup-6481d.firebaseapp.com",
  projectId: "fypsignup-6481d",
  storageBucket: "fypsignup-6481d.appspot.com",
  messagingSenderId: "246626123583",
  appId: "1:246626123583:web:93bc9142a05ab0c4795d8a"
 });
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// signup function
 const signup=()=>{
  const email = document.getElementById("email").value;
  const password = document.getElementById('password').value;
  const cnic = document.getElementById('cnic').value; // New field: CNIC
    const contactNumber = document.getElementById('contact').value; // New field: Contact number
  console.log(email,password) 
  //firebase code
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed up 
    const uid = userCredential.user.uid;
     db.collection("Users").doc(uid).set({
      email: email,
      cnic: cnic,
      contactNumber: contactNumber
  
    
     })

     .then(()=> {
      console.log("Document successfully written!");
      alert("signed up");
      console.log(userCredential)
      window.location.href = "signin.html";


   
  })

  .catch((error) => {
    console.error("Error adding user document: ", error);
    alert("failed");
     });
    
  })
  .catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      console.log("Email already in use.");
      alert("already exist");
    } else {
      console.error("Error during signup: ", error);
      alert("Incorrect password or email address");
    }
  });
 }
//signup end


 //sign in function

 const signIn = ()=>{
  const email = document.getElementById("email").value;
  const password = document.getElementById('password').value;

  //firebase code
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("Document successfully written!");
    alert("signed in");
    window.location.href = "otp.html";

    if (email === "asfandafridi97@gmail.com" && password === "asdfgh") {
      // Redirect to admin dashboard
      window.location.href = "adminDashboard.html";
  } else {
      // Redirect to regular user dashboard
      window.location.href = "otp.html";
  }

    
   console.log(userCredential)
    // ...
  })
  .catch((error) => {
    console.log(error.code);
    console.log(error.message)
    alert("Incorrect password or email address");
  });
 }
//Sign in end
 


// Logout function start
const logout = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('User signed out successfully');
    alert("logged out");
    window.location.href = 'index.html'; // Redirect to the sign-in page
  }).catch((error) => {
    // An error happened.
    console.error('Error signing out:', error);
    alert('Failed to sign out. Please try again.');
  });
}
//logout ends 


 //Post task function
const postTask = ()=>{
   // // get current user
const user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    
    const uid = user.uid;
       
  const task = document.getElementById('task').value;
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;
  const budget = document.getElementById('budget').value;
  const phone = document.getElementById('phone').value;

  // Add a new document in collection "Users"
db.collection("Users").doc(uid).collection("Tasks").add({
  taskId: "", 
  budget: budget,
    date: date,
   location: location,
    phone: phone,
    task: task
})

.then((docRef) => {
  console.log("Document successfully written with Id");
  const taskId = docRef.id;
 
  docRef.update({
    taskId: taskId
  })
  
  .then(() => {
    console.log("Document successfully written!");
    alert("task posted");
    window.location.href = "posterDashboard.html";
    
  })
  .catch((error) => {
    console.log(error.code);
      console.log(error.message)
      alert("Failed to post task");
    
  });

})
.catch((error) => {
  // Error adding document
  console.error("Error adding document: ", error);
  alert("Failed to post task");
});


}
else{
  window.location.href = "signin.html";
}
  });
}




//Post Task  End



//Acount Details start

const acountTask = ()=>{
  // // get current user
const user = firebase.auth().currentUser;
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
   
   const uid = user.uid;
      
 const acountNumber = document.getElementById('acountNumber').value;
 const type = document.getElementById('type').value;
 

 // Add a new document in collection "Users"
db.collection("Users").doc(uid).collection("Performer").add({
  acountNumber: acountNumber,
   type: type,
  
})
.then(() => {
 console.log("Document successfully written!");
 alert("Thank you for your response");
 window.location.href = "performTask.html";
 
})
.catch((error) => {
 console.log(error.code);
   console.log(error.message)
   alert("Failed to submit");
 
});
}
else{
 window.location.href = "signin.html";
}
 });
}
//Account Detail  End



function GetAllDataRealtime() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const uid = user.uid;

      db.collection("Users").doc(uid).collection("Tasks").onSnapshot((querySnapshot) => {
        var tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        AddAllItemToTheCard(tasks);
      });
    } else {
      // User is not signed in, redirect to sign-in page
      window.location.href = "signin.html";
    }
  });
}

function AddItemToCard(id, task, location, date, budget, phone, status) {
  var cardContainer = document.getElementById('cardContainer');

  var card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  var cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  var title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = task;

  var idPara = document.createElement('p');
  idPara.classList.add('card-text');
  idPara.textContent = 'ID: ' + id;

  var locationPara = document.createElement('p');
  locationPara.classList.add('card-text');
  locationPara.textContent = 'Location: ' + location;

  var datePara = document.createElement('p');
  datePara.classList.add('card-text');
  datePara.textContent = 'Date: ' + date;

  var budgetPara = document.createElement('p');
  budgetPara.classList.add('card-text');
  budgetPara.textContent = 'Budget: ' + budget;

  var phonePara = document.createElement('p');
  phonePara.classList.add('card-text');
  phonePara.textContent = 'Contact: ' + phone;

  // Button for deleting task
  var deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    deleteTask(id);
  };

  // Button for paying for task
  var payButton = document.createElement('button');
  payButton.classList.add('btn', 'btn-success');
  payButton.textContent = 'Pay for your task';
  payButton.onclick = function () {
    window.location.href = "payment.html";
  };

  // Button for agreeing if task is done
  var agreeButton = document.createElement('button');
  agreeButton.classList.add('btn', 'btn-primary');
  agreeButton.textContent = 'Agree if done';

  // Disable the button if the task is already marked as done
  if (status === "done") {
    agreeButton.disabled = true;
  }

  agreeButton.onclick = function () {
    const user = firebase.auth().currentUser;
    if (user) {
      // Mark task as done in Firestore
      db.collection("Users").doc(user.uid).collection("Tasks").doc(id).update({
        status: "done"
      })
        .then(() => {
          console.log("Task marked as done successfully!");
          agreeButton.disabled = true;
        })
        .catch((error) => {
          console.error("Error marking task as done: ", error);
        });
    } else {
      alert('Please sign in to confirm the task.');
      window.location.href = 'signin.html';
    }
  };

  cardBody.appendChild(title);
  cardBody.appendChild(idPara);
  cardBody.appendChild(locationPara);
  cardBody.appendChild(datePara);
  cardBody.appendChild(budgetPara);
  cardBody.appendChild(phonePara);
  cardBody.appendChild(payButton);
  cardBody.appendChild(agreeButton);
  cardBody.appendChild(deleteButton);

  card.appendChild(cardBody);
  cardContainer.appendChild(card);
}


//   cardBody.appendChild(idPara);
//   cardBody.appendChild(title);
//   cardBody.appendChild(locationPara);
//   cardBody.appendChild(datePara);
//   cardBody.appendChild(budgetPara);
//   cardBody.appendChild(phonePara);
  
//   cardBody.appendChild(payButton);
//   cardBody.appendChild(agreeButton);
//   cardBody.appendChild(deleteButton);

//   card.appendChild(cardBody);
//   cardContainer.appendChild(card);
// }






// Function to delete a task
function deleteTask(taskId) {
  db.collection("Users").doc(firebase.auth().currentUser.uid)
      .collection("Tasks").doc(taskId).delete()
      .then(() => {
          console.log("Document successfully deleted!");
      })
      .catch((error) => {
          console.error("Error removing document: ", error);
      });
}

function AddAllItemToTheCard(UserDocsList) {
  document.getElementById('cardContainer').innerHTML = ""; // Clear previous cards
  UserDocsList.forEach(element => {
      AddItemToCard(element.id,element.task, element.location, element.date, element.budget, element.phone);
  });
}

window.onload = GetAllDataRealtime;



// check if poster sign in for dashboard button
const dashBoard = ()=> {
  // Check if the user is logged in
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          // User is logged in, allow them to confirm the task
          window.location.href = "posterDashboard.html";
      } else {
          // User is not logged in, redirect them to the login page
          window.location.href = "signin.html";
          
        }
    
  });
}; 


// check if poster sign in for dashboard button
const post = ()=> {
  window.location.href = "postTaskForm.html";
}; 
//checking end 

//Get All Tasks for performer 

//firebase.initializeApp(firebaseConfig);




