var db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);
var mainApp = {};
(function(){

    var firebase = app_fireBase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;
        var name, email, uid, emailVerified;

        if (user){
          // User is signed in.
          uid = user.uid;
          name = user.displayName;
          email = user.email;
          emailVerified = user.emailVerified;
         
          //Welcome message unique per user
          //const user_dashboard = document.querySelector("#user_dashboard");
          //user_dashboard.innerHTML = "<h> Welcome, " + name + "</h>";
          document.getElementById("user_dashboard").innerHTML = "Welcome, "+ name;

    }
        else{
          // redirect to login page.
          uid = null;
          window.location.replace("login.html");
        }
      });

      function logOut(){
          firebase.auth().signOut();
      }

      mainApp.logOut = logOut;
      mainApp.dataStore = dataStore;
})()


var selectedFile;
$("#file").on("change", function(event){
    selectedFile = event.target.files[0];
    
});
    var imageURL;
    var imagePath;
    function imageUpload(){
        //get elements
    
    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');

    //listen for file selection
    
    fileButton.addEventListener('change', function(e) {
            var user = firebase.auth().currentUser;
            var uid;

            if (user){
                // User is signed in.
                uid = user.uid;
            }

        //get file
        var file = e.target.files[0];
        //create storage ref
        var storageRef = firebase.storage().ref(uid + '/' + file.name);

        //upload file
        var task = storageRef.put(file);
                
        //update progress bar
        task.on('state_changed',
               function progress(snapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
                function error(err){
            
        },
                function complete(){
                    storageRef.getDownloadURL().then(function(url) {
                        // Insert url into an <img> tag to "download"
                        imageURL = url;
                        imagePath = storageRef;
                      }).catch(function(error) {
                      
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                          case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                      
                          case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                      
                          case 'storage/canceled':
                            // User canceled the upload
                            break;
                      
                          case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                        }
                      });

        }
               );
    });
    }

document.getElementById('dashForm').addEventListener('submit', dataStore);
function dataStore(e){
    e.preventDefault();
    const petName = document.querySelector("#petname").value;
    const petSpecies = document.querySelector("#petspecies").value;
    const petBreed = document.querySelector("#petbreed").value;
    const lostLocation = document.querySelector("#lostlocation").value;
    const Reward = document.querySelector("#reward").value;
    const distinctFeatures = document.querySelector("#DistinctFeatures").value;
    const imgSubmit = imageURL;
    //const imgPath = imagePath;

    //alert(imageURL);
    //alert(imgPath);
    var user = firebase.auth().currentUser;
    var name, email, uid, emailVerified;

    if (user){
      // User is signed in.
      uid = user.uid;
      name = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
    }

     setTimeout(db.collection("Posts").doc().set, 500) 
    db.collection("Posts").doc().set({
        Pet_Name : petName,
        Pet_Species: petSpecies,
        Pet_Breed : petBreed,
        Last_Location : lostLocation,
        Reward : Reward,
        Distinct_Features : distinctFeatures,
        ImageURL : imgSubmit,
        User_Email : email,
        User_Name : name,
        User_UID : uid,
        //Image_Path : imagePath
    })


     
    
    $("#postedAlet").show().delay(3000).fadeOut('slow');
    setTimeout(location.reload.bind(location), 500)
  }


//const posts_div = document.getElementById("#posts_group");

const posts_div = document.getElementById("myTable");

db.collection("Posts").onSnapshot(function(querySnapshot) 
{
    
        querySnapshot.docChanges().forEach(function(change)
        {
            /*
            if(change.type === "added")
            {
               posts_div.innerHTML +=  "<div id='posts-item' class='col-sm-8'><img align='right' id='postImage' src='" + change.doc.data().ImageURL + "'/><ul align='left' id='postFields' style='list-style-type: none'><br><li>Pet Name: " + change.doc.data().Pet_Name + "</li><li>Pet Species : " + change.doc.data().Pet_Species + "</li><li>Pet Breed: " + change.doc.data().Pet_Breed + "</li><li>Last Location : " + change.doc.data().Last_Location + "</li><li>Reward: " + change.doc.data().Reward + "</li><li>Distinct Features : " + change.doc.data().Distinct_Features + "</li></ul><a id = found_pet href='mailto:" + change.doc.data().User_Email + "?Subject=[FIND%20MY%20PET]%20Your%20pet%20has%20been%20FOUND' target='_top'>Found " + change.doc.data().User_Name +"'s Pet</a><br><br></div>";
            }
            */

            if(change.type === "added")
            {
                /*posts_div.innerHTML += "<div class ='list-item'><p>Name: " + change.doc.data().Pet_Name + "</p></div>"*/
               posts_div.innerHTML +=  "<tr><td>" + change.doc.data().Last_Location + "</td><td>" + change.doc.data().Pet_Name + "</td><td>" + change.doc.data().Pet_Species + "</td><td>" + change.doc.data().Pet_Breed + "</td><td>" + change.doc.data().Reward + "</td><td>" + change.doc.data().Distinct_Features + "</td><td><img align='right' id='postImage' src='" + change.doc.data().ImageURL + "'/></td><td><a id = found_pet href='mailto:" + change.doc.data().User_Email + "?Subject=[FIND%20MY%20PET]%20Your%20pet%20has%20been%20FOUND' target='_top'>Found " + change.doc.data().User_Name +"'s Pet</a></td></tr>";
            }
        });
        
});

function myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr"),
    th = table.getElementsByTagName("th");

   // Loop through all table rows, and hide those who don't match the        search query
for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none";
    for(var j=0; j<th.length-2; j++){
td = tr[i].getElementsByTagName("td")[j];      
if (td) {
    if (td.innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1)                               {
        tr[i].style.display = "";
        break;
    }
}
}

  }
}

