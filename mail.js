const firebaseConfig = {
    apiKey: "AIzaSyB1cB8ZgVD5EM5pp47KMU95OjdW8eZoALI",
    authDomain: "portfolio-website-c3b4f.firebaseapp.com",
    databaseURL: "https://portfolio-website-c3b4f-default-rtdb.firebaseio.com",
    projectId: "portfolio-website-c3b4f",
    storageBucket: "portfolio-website-c3b4f.firebasestorage.app",
    messagingSenderId: "971723032764",
    appId: "1:971723032764:web:99fccfa5066f423db728b9",
    measurementId: "G-FKVNHRWX6H"
  };

  // initialize firebase
  firebase.initializeApp(firebaseConfig);

  // reference your database
    var contactFormDB = firebase.database().ref('Contact Form');

    document.getElementById('contact').addEventListener('submit', submitForm); 

    function submitForm(e){
        e.preventDefault();

        var name = getElementVal('name');
        var email = getElementVal('email');
        var message = getElementVal('message');

        saveMessages(name, email, message);

        // enable alert
        document.querySelector('.alert').style.display = 'block';

        // remove the alert after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').style.display = 'none';
        }, 3000);


        // reset the form
        document.getElementById('contact').reset();
    };

    const saveMessages = (name, email, message) => {
        var newContactForm = contactFormDB.push();
        newContactForm.set({
            name: name,
            email: email,
            message: message,
        });
    };

    const getElementVal = (id) => {
        return document.getElementById(id).value;
    };


