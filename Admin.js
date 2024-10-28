// Setting up firebase with our website
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
const db3 = firebase.firestore();

// Function to fetch accounts data and add it to cards
function getAcounts() {
  db3.collectionGroup("Performer").onSnapshot((querySnapshot) => {
      var account = [];
      querySnapshot.forEach((doc) => {
          account.push({ id: doc.id, ...doc.data() });
      });
      addAllAccountsToCards(account);
  });
}

// Function to add account data to cards
function addToCard(id, taskId, acountNumber, type, cnic, contact, address) {
  var cardContainer = document.getElementById('cardContainer2');
  var card = document.createElement('div');
  card.classList.add('card', 'mb-3', 'shadow-sm', 'p-3', 'bg-white', 'rounded');
  
  var cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const taskIdPara = document.createElement('p');
  taskIdPara.classList.add('card-text');
  taskIdPara.innerHTML = `<strong>Task ID:</strong> ${taskId}`;

  const accountNumberPara = document.createElement('p');
  accountNumberPara.classList.add('card-text');
  accountNumberPara.innerHTML = `<strong>Account Number:</strong> ${acountNumber}`;

  const typePara = document.createElement('p');
  typePara.classList.add('card-text');
  typePara.innerHTML = `<strong>Type:</strong> ${type}`;

  const cnicPara = document.createElement('p');
  cnicPara.classList.add('card-text');
  cnicPara.innerHTML = `<strong>CNIC Number:</strong> ${cnic}`;

  const contactPara = document.createElement('p');
  contactPara.classList.add('card-text');
  contactPara.innerHTML = `<strong>Contact Number:</strong> ${contact}`;

  const addressPara = document.createElement('p');
  addressPara.classList.add('card-text');
  addressPara.innerHTML = `<strong>Address:</strong> ${address}`;

  var proceedButton = document.createElement('button');
  proceedButton.classList.add('btn', 'btn-primary', 'mt-2');
  proceedButton.textContent = 'Proceed Payment';
  proceedButton.onclick = function () {
      window.open("https://www.easypaisa.com.pk/");
  };

  cardBody.appendChild(taskIdPara);
  cardBody.appendChild(accountNumberPara);
  cardBody.appendChild(typePara);
  cardBody.appendChild(cnicPara);
  cardBody.appendChild(contactPara);
  cardBody.appendChild(addressPara);
  cardBody.appendChild(proceedButton);

  card.appendChild(cardBody);
  cardContainer.appendChild(card);
}

// Function to add all accounts to cards
function addAllAccountsToCards(account) {
  var cardContainer = document.getElementById('cardContainer2');
  cardContainer.innerHTML = '';
  account.forEach(element => {
      addToCard(element.id, element.taskId, element.acountNumber, element.type, element.cnic, element.contact, element.address);
  });
}

// Function to display agreed task data
function displayAgreedTaskData() {
  var taskData = JSON.parse(localStorage.getItem('agreedTaskData'));
  if (taskData) {
      addToCard(taskData.id, taskData.task, taskData.location, taskData.date, taskData.budget, taskData.phone);
      addToOtherContainer(taskData);
      localStorage.removeItem('agreedTaskData');
  }
}

// Function to add agreed task data to other container
function addToOtherContainer(taskData) {
  var otherContainer = document.getElementById('otherContainer');
  var taskInfo = document.createElement('div');
  taskInfo.classList.add('mb-3', 'p-3', 'bg-light', 'rounded', 'shadow-sm');
  taskInfo.innerHTML = `
      <p><strong>Task ID:</strong> ${taskData.id}</p>
      <p><strong>Task:</strong> ${taskData.task}</p>
      <p><strong>Location:</strong> ${taskData.location}</p>
      <p><strong>Date:</strong> ${taskData.date}</p>
      <p><strong>Budget:</strong> ${taskData.budget}</p>
      <p><strong>Contact:</strong> ${taskData.phone}</p>
  `;
  otherContainer.appendChild(taskInfo);
}

// Initial load
window.onload = function () {
  getAcounts();
  displayAgreedTaskData();
};

// Load data when the window is reloaded
window.addEventListener('load', function () {
  displayAgreedTaskData();
});
