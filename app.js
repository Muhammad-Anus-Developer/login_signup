const firebaseConfig = {
  apiKey: "AIzaSyBjM5nFrxaCq6pXePLpDJ2kHl7GOaf_rtY",
  authDomain: "inputdatas.firebaseapp.com",
  databaseURL: "https://inputdatas-default-rtdb.firebaseio.com",
  projectId: "inputdatas",
  storageBucket: "inputdatas.appspot.com",
  messagingSenderId: "1056710307820",
  appId: "1:1056710307820:web:f3028bb1b40e52ed75dac9",
  measurementId: "G-0HC7FE3SZ2"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    your_name = document.getElementById('your_name').value
    father_name = document.getElementById('father_name').value
    phone_number = document.getElementById('phone_number').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(your_name) == false || validate_field(father_name) == false || validate_phone(phone_number) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
// Date
 
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + "time ==>" + "" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      // Create User data
      var user_data = {
        email : email,
        father_name : father_name,
        your_name : your_name,
        phone_number : phone_number,
        last_login : date
      }
  

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')


    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
 

      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
    alert('User Logged In Successfully!!');

  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_phone(phone){
      if(phone.length < 12){
        alert('Enter PROPER Phone Number') 
        return false
      }else{
          return true
      }
  }

  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }