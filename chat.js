// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW4cTAsG2QiXXGvS2FyOwZYbR_BqCQDXM",
  authDomain: "contactform-37fe3.firebaseapp.com",
  databaseURL: "https://contactform-37fe3-default-rtdb.firebaseio.com",
  projectId: "contactform-37fe3",
  storageBucket: "contactform-37fe3.appspot.com",
  messagingSenderId: "831163231244",
  appId: "1:831163231244:web:63e09ac7aadb77b78a9229",
  measurementId: "G-4R4K8TGVQ1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Reference to chat messages in the database
const messagesRef = db.ref('messages');

// Get HTML elements
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chat-messages');

const username = "User1"; // Static username for now. User2 should be added manually in Firebase.

function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== "" && username !== null) {
      const newMessageRef = messagesRef.push();
      newMessageRef.set({
          username: username,
          message: message
      }).then(() => {
          console.log("Message sent and saved to database.");
      }).catch((error) => {
          console.error("Error sending message: ", error);
      });

      // Immediately display the message in the UI
      displayMessage(username, message);
      
      messageInput.value = ""; // Clear the input field
  }
}

// Listen for new messages and update the UI in real-time
messagesRef.on('child_added', (snapshot) => {
  const messageData = snapshot.val();
  displayMessage(messageData.username, messageData.message);
});

// Function to display a message
function displayMessage(username, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(username === "entre username and password" ? 'right' : 'left');
  messageElement.innerHTML = `
      <span class="username">${username}: </span>${message}
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  console.log("Displayed message from", username);
}

// Update messages every 5 seconds
setInterval(() => {
  messagesRef.once('value', (snapshot) => {
      chatMessages.innerHTML = ""; // Clear current messages
      snapshot.forEach((childSnapshot) => {
          const messageData = childSnapshot.val();
          displayMessage(messageData. messageData.message);
      });
  });
}, 5000);
