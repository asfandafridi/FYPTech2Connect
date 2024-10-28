
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
  

 //check if taskperformer signed in
 const checkSignin = ()=> {
    // Check if the user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is logged in, allow them to confirm the task
            window.location.href = "performbtn.html";
        } else {
            // User is not logged in, redirect them to the login page
            window.location.href = "signin.html";
        }
    });
}; 

//checking ends 





  //Get All Tasks for performer 
  
  const db1 = firebase.firestore();
  //firebase.initializeApp(firebaseConfig);
  
  function getAllTasks(location) {
    // Query the Firestore collection based on location
    db1.collectionGroup("Tasks")
        .where("location".toLowerCase(), "==", location)
        .onSnapshot((querySnapshot) => {
            var tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({id: doc.id, ...doc.data()});
            });
            addAllTasksToCards(tasks);
        });
}

const db2 = firebase.firestore();

function getAll() {
    // Query the Firestore collection based on location
    db2.collectionGroup("Tasks")
       // .where("location", "==", location)
        .onSnapshot((querySnapshot) => {
            var tasks = [];
            querySnapshot.forEach((doc) => {
                tasks.push({id: doc.id, ...doc.data()});
            });
            addAllTasksToCards(tasks);
        });
}
  
  // Function to add task data to cards
  function addItemToCard(id, task, location, date, budget, phone) {
      var cardContainer = document.getElementById('cardContainer1');
  
      var card = document.createElement('div');
      card.classList.add('card');
  
      var cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      var title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = task;
  

      var idPara = document.createElement('p');
      idPara.classList.add('card-text');
      idPara.textContent = 'Task Id: ' + id;


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

      // Button for taking task
      const confirmButton = document.createElement('button');
      confirmButton.classList.add('btn', 'btn-primary');
      confirmButton.textContent = 'Confirm Task';
      confirmButton.onclick = function() {
          // Get current user
          const user = firebase.auth().currentUser;
          if (user) {
              // Disable the button
              confirmButton.disabled = true;
              // Save task to performer's confirmed tasks in Firestore
              const userId = user.uid;
              const taskData = { id, task, location, date, budget, phone, status: 'confirmed' };
              db.collection('performers').doc(userId).collection('confirmedTasks').doc(id).set(taskData)
                  .then(() => {
                      alert('Task confirmed!');
                      window.location.href = "performerDashboard.html";
                  })
                  .catch(error => {
                      console.error('Error confirming task: ', error);
                      confirmButton.disabled = false; // Re-enable the button if there's an error
                  });
          } else {
              alert('Please sign in to confirm the task.');
              window.location.href = 'signin.html';
          }
          confirmButton.style.display = 'none';
      };
      

  
      cardBody.appendChild(title);
      cardBody.appendChild(locationPara);
      cardBody.appendChild(datePara);
      cardBody.appendChild(budgetPara);
      cardBody.appendChild(phonePara);
      cardBody.appendChild(confirmButton);
      cardBody.appendChild(idPara);


      card.appendChild(cardBody);
      cardContainer.appendChild(card);
  }
  
  // Function to add all tasks to cards
  function addAllTasksToCards(tasks) {
    var cardContainer = document.getElementById('cardContainer1');
    // Clear previous cards
    cardContainer.innerHTML = '';
      tasks.forEach(task => {
          addItemToCard(task.id, task.task, task.location, task.date, task.budget, task.phone);
      });
  }
  
  window.onload = getAllTasks;
  window.onload = getAll;
  

 

// Event listener for the location filter dropdown
document.getElementById('locationFilter').addEventListener('change', function(event) {
    const selectedLocation = event.target.value;
    if (selectedLocation !== 'all') {
        // If "All Locations" is selected, fetch all tasks
         getAllTasks(selectedLocation);
    } else {
        // Otherwise, fetch tasks for the selected location
        getAll()
    }
});

  window.onload = getAllTasks;
  window.onload = getAll;

// Call getAllTasks function initially to fetch all tasks
window.onload = function() {
    getAllTasks();
};

window.onload = function() {
    getAll();
};
  
const dashBoard2 = ()=> {
    // Check if the user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is logged in, allow them to confirm the task
            window.location.href = "performerDashboard.html";
        } else {
            // User is not logged in, redirect them to the login page
            window.location.href = "signin.html";
            
          }
      
    });
  }; 

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
  






  
