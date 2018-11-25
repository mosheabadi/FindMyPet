var db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);
var mainApp = {};
var userId;  

(function(){

    var firebase = app_fireBase;
    var uid = null;
    firebase.auth().onAuthStateChanged( user => {
        if(user) {this.userId = user.uid}
    });

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
          //console.log("UID = ", current_uid);

          const posts_div = document.getElementById("myTable");
        console.log("UID = ", userId)
        db.collection("Posts").doc(uid).collection("Pets").onSnapshot(function(querySnapshot) 
        {
    
        querySnapshot.docChanges().forEach(function(change)
        {

            if(change.type === "added")
            {
            var documentID = change.doc.data().Document_Link;
               posts_div.innerHTML +=  `<tr><td>` + change.doc.data().Last_Location + `</td><td>` + change.doc.data().Pet_Name + `</td><td>` + change.doc.data().Pet_Species + `</td><td>` + change.doc.data().Pet_Breed + `</td><td>` + change.doc.data().Reward + `</td><td>` + change.doc.data().Distinct_Features + `</td><td><img align='right' id='postImage' src='` + change.doc.data().ImageURL + `'/></td><td><a id = found_pet onclick='deletePet("`+ change.doc.data().Document_Link + `")'> Found/Remove </a></td></tr>`;
            }
        });
        
        });

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
    db.collection("Posts").doc(uid).collection("Pets").doc().set({
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
    }) .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        var docLinkID = docRef.id;
        setTimeout(db.collection("Posts").doc(uid).collection("Pets").doc(docLinkID).set, 500) 
        db.collection("Posts").doc(uid).collection("Pets").add({
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
           Document_Link : docLinkID,
           //Image_Path : imagePath
       })
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
    $("#postedAlet").show().delay(3000).fadeOut('slow');
    setTimeout(location.reload.bind(location), 500)
  }




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
    if (td.innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1){
        tr[i].style.display = "";
        break;
    }
}
}

  }
}



    function deletePet(v) {
        var firebase = app_fireBase;
        var uid = null;
        firebase.auth().onAuthStateChanged( user => {
            if(user) {this.userId = user.uid}
        });
        console.log(v);
        db.collection("Posts").doc(v).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        db.collection("Posts").doc(userId).collection("Pets").doc(v).delete().then(function() {
            console.log("Document successfully deleted!");
            setTimeout(location.reload.bind(location), 500);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

    }
