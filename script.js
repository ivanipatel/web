// Initialize Firebase with your project configuration (replace with your own credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const regUsername = document.getElementById("reg-username").value;
    const regPassword = document.getElementById("reg-password").value;

    // Create a new user in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(regUsername, regPassword)
        .then((userCredential) => {
            // User registered successfully
            const user = userCredential.user;
            alert("Registration successful! User ID: " + user.uid);

            // Add user data to Firebase Realtime Database (replace 'users' with your database path)
            firebase.database().ref('users/' + user.uid).set({
                username: regUsername,
                email: user.email,
                // Add more user data as needed
            });
        })
        .catch((error) => {
            // Handle registration errors
            alert("Registration failed: " + error.message);
        });
});

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;

    // Authenticate user with Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(loginUsername, loginPassword)
        .then((userCredential) => {
            // User logged in successfully
            const user = userCredential.user;
            alert("Login successful! User ID: " + user.uid);
        })
        .catch((error) => {
            // Handle login errors
            alert("Login failed: " + error.message);
        });
});
