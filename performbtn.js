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

// Retrieve task ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('taskId');
console.log("Task ID: ", taskId);  // Debugging: Print taskId to console

const submitBtn = () => {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          const uid = user.uid;

          const accountNumber = document.getElementById('accountDetails').value;
          const type = document.getElementById('type').value;
          const cnic = document.getElementById('cnic').value;
          const contact = document.getElementById('contact').value;
          const address = document.getElementById('address').value;

          // Add a new document in collection "Users"
          db.collection("Users").doc(uid).collection("Performer").add({
            taskId: taskId,
              accountNumber: accountNumber,
              type: type,
              cnic: cnic,
              contact: contact,
              address: address
          })
          .then(() => {
              console.log("Document successfully written!");
              alert("Task ID: " + taskId);  // Corrected alert message
              window.location.href = "performTask.html";
          })
          .catch((error) => {
              console.log(error.code);
              console.log(error.message);
              alert("Failed to submit");
          });
      } else {
          window.location.href = "signin.html";
      }
  });
};
