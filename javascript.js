var numStudents = 0;
var names; //string array of names
var namesString = ""; //converts names to a string in order to store in localStorage
var numLines = 0;
var probPointsToAdd;
var pointsArray = []; //int array of prob points each person has
var pointsString = ""; //converts pointsArray to a string in order to store in localStorage
var selectedStudent;
var r; //stores index of randomly selected number
var startIndex = 0;
var count=0;
var selectedIndex;
var countPointsAdded;
var countSelections = 1;
var storageName = "";
var storageNames = "";
var optionToAdd;
var countItemsInMenu = 0;
var namesToAdd = [];
var askToSave = false;
var shouldDeleteSet = false; 
var nameToDelete;
var editOption;
var namesEditList; //array of names to be added in the edit set screen
var reset = false;
var resetChoice = false;
storageNames = localStorage.getItem("storageNames");



function help(){
    
document.body.style.backgroundImage='none'; 
document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='pitch'>Help</p> <div class='helppage'><p>If this is your first time using this application or you would like to create a new set of students, please click on the <strong>Get Started</strong> button. You will then be able to enter the names of all your students into the selector.</p><button type='button' onclick='start()' class='helppagebuttons'>Get Started</button><button type='button' onclick='openExisting()' class='helppagebuttons'>Open Existing Set</button><p>If you have already created a set and would like to continue using it, click on the <strong>Open Existing Set </strong>button.</p><button type='button' onclick='home()' class='helppagebuttons'>Home Page</button></div>";}

function about(){
    document.body.style.backgroundImage='none'; 
    document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='pitch'>About</p><div class='aboutpage'><p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspThe Student Selector solves a very common problem that most teachers encounter: Which student should be picked next? Some teachers use a stack of cards or a bunch of popsicle sticks to choose the next student. The problem with these methods is that once a student is chosen, that student will know that 24 (assuming a class of 25 students) other people must be chosen before he will be forced to participate again. That student could, for all intensive purposes, zone out the rest of the class period because the student knows that he or she will not be called on. Most online selectors simply choose a student randomly. Once again, this method is flawed because making the draw completely random could leave a student speaking 5 times and another student 0 times in a class period.</p><p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspThe Student Selector combines the two methods. When a student is selected, some of his or her <em>probability points</em> are distributed to the other students. This means, that the probability of that same student being chosen again is decreased, but is not zero. That student must still pay attention in the slight chance that his or her name is chosen. Additionally, students who haven't participated in a long time will have accumulated so many points that the chances they will be chosen will be quite high.</p><p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAside from this effective algorithm, this web application is easy and quick to use. The first time through, you will enter the names of all your students. After that, you can just choose the <em>Open Existing Set</em> button to continue where you left off. I hope you find this tool to be easy, quick, and effective!</p></div><div class='helppage'><button type='button' onclick='home()'>Home Page</button></div>";    
}

function home(){
// if (askToSave){
//     var s = confirm("Would you like to save set before exiting?");    
// }
// if (s){
//     save();    
// }
document.body.style.backgroundImage="url('http://www.jisclegal.ac.uk/Portals/12/Images/lecturers.jpg')";
document.getElementById("entire").innerHTML="<div id='entire'><div><p id='head'>Student Selector</p><p id='pitch'>Easy. Quick. Effective.</p></div><div class='main'><div><button type='button' onclick='start()'>Get Started</button></div><div><button type='button' class='threebuttons' onclick='openExisting()'>Open Existing Set</button></div><div><button type='button' class='threebuttons' onclick='about()'>About</button></div><div><button type='button' class='threebuttons' onclick='help()'>Help</button></div></div></div>"}

function start(){
  
document.body.style.backgroundImage="none";


document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='pitch'>Create Set</p><div class='createpage'><div>Name of Set: <input type='text' size='30' name='setNameInput' id='numb3' autofocus><input type='submit' onclick='createenternumber()' id='numb4' required><p id='checkNum'>Example: Period 2 Calculus</p><div id='textBox'></div></div><button type='button' onclick='home()' class='helppagebuttons'>Home Page</button></div>"

}

function createenternumber(){
    storageName = document.getElementById("numb3").value;
    if ((storageName.trim() == "")) {
        document.getElementById("checkNum").innerHTML="Please enter a name with at least one character.";
    } else {
    countSelections = 1;
    startIndex = 0;  
    document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='pitch'>Create Set</p><div class='createpage'><div>Number of students: <input type='text' size='30' name='numStudentsInput' id='numb' autofocus><input type='submit' onclick='createenternames()' id='numb2' required><p id='checkNum'>Enter the number of students in your class.</p><div id='textBox'></div></div><button type='button' onclick='home()' class='helppagebuttons'>Home Page</button></div>"
    }
}


function createenternames(){
    numStudents = document.getElementById("numb").value;
    if ((numStudents.trim() == "") || isNaN(numStudents) || numStudents <= 0) {
        document.getElementById("checkNum").innerHTML="Please enter a whole, positive number.";
    } else {
    
    document.getElementById("numb").disabled = "true";
    document.getElementById("numb2").disabled = "true";
       
       document.getElementById("textBox").innerHTML="<p>Enter the names of the students below. Enter one student per line. Do not skip lines.<p id='checkNum'>Remember to submit at the end.</p></p><textarea rows=" + numStudents + "cols='55' id='textareaId'>John Doe &#10Anthony Carroll</textarea><br><input type='submit' onclick='validatefield()' id='numb2' required><p id='displayError'></p>"; 
}
}

function validatefield(){
    numLines = 0;
    
    names = document.getElementById('textareaId').value.split(/\n/g);   
    for (var i = 0; i < names.length; i++){
        if (names[i] != ""){
            numLines++;
        }
        else{
            names.splice(i, 1); 
            i--;
        }
    }
    
    if (numLines > numStudents){
        document.getElementById("displayError").innerHTML="You have more entries than students. Either remove some student names or click the home button and restart the process.";    
    }
    else if (numLines < numStudents){
        document.getElementById("displayError").innerHTML="You have less entries than students. Either add more student names or click the home button and restart the process.";    
    }
    else{
        init();    
    }
}

function init(){
    //askToSave = true;
    r = Math.floor(Math.random()*numStudents);
    selectedStudent = names[r];
    
    for (var i = 0; i < numStudents; i++){
        if (i != r){
            pointsArray[i] = Number(numStudents) + 1;  
        }    
        else{
            pointsArray[i] = 1;    
        }
    }
    saveAs();

   selectStudentScreen();
    

}

function selectStudentScreen(){
    save();
      document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='displayStudent'>" + selectedStudent +"</p><p id='displayNumSelections'>Number of students selected: " + countSelections + "</p><div class='helppage'><button type='button' onclick='selectStudent()' id='nextStudentButton'>Next Student</button><br><br><button type='button' class='initpagebuttons' onclick='edit()'>Edit Set</button><button type='button' class='initpagebuttons' onclick='home()'>Home Page</button></div>"; 
}

function selectStudent(){
   //alert("button works");
    //askToSave = true;
    countSelections++;
    count=0;
    countPointsAdded = 0;
    selectedIndex = 0;
    r = Math.floor(Math.random()*numStudents*numStudents);
    outerLoop:
    for (var i = 0; i < numStudents; i++){
        for (var j = 0; j < pointsArray[i]; j++){
            if (count == r){
                selectedIndex = i;
                break outerLoop;
            }
            count++;
        }    
    }
    selectedStudent = names[selectedIndex];
    
    
    if (pointsArray[selectedIndex] < numStudents){
        probPointsToAdd = pointsArray[selectedIndex];    
    }
    else{
        probPointsToAdd = numStudents;    
    }
    
    pointsArray[selectedIndex] -= probPointsToAdd;
    
    for (var i = startIndex; countPointsAdded < probPointsToAdd; i++){
        if (i >= numStudents){
            i = 0;    
        }
        pointsArray[i]++;
        countPointsAdded++;
    }
    startIndex++;
    if (startIndex >= numStudents){
        startIndex = 0;    
    }
    
    document.getElementById("displayStudent").innerHTML=selectedStudent;
    document.getElementById("displayNumSelections").innerHTML="Number of students selected: " + countSelections;
    save();
}
function edit(){
    document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='pitch'>Edit Set</p><p id='openpage'></p><div align='center'><select name='select1' id='menu2' onChange='editSet()'><option>Click Me to Add or Remove Students</option><option>Add Students</option><option>Add Students and Reset Probability Points</option><option>Remove Students</option><option>Remove Students and Reset Probability Points</option><option>Reset Probability Points</option></select><p id='clarify'>Resetting <em>Probability Points</em> means that every student will once again have an equal chance of being chosen.</p><div id='textBox2'></div><br><button type='button' onclick='selectStudentScreen()' class='openpagebuttons'>Cancel</button></div>";    
}

function editSet(){
    reset = false;
    resetChoice = false;
    editOption = document.getElementById("menu2").value; 
    document.getElementById("menu2").disabled="true";
    document.getElementById("clarify").innerHTML="";
    
    if(editOption == "Add Students"){
        document.getElementById("textBox2").innerHTML="<p>Enter the names of the students you would like to add below. Enter one student per line. Do not skip lines.<p id='checkNum'>Submitting will save the changes.</p></p><textarea rows='3' cols='55' id='textareaId2'></textarea><br><input type='submit' onclick='addNames()' id='numb2' required><p id='displayError'></p>";
    }
    
    else if(editOption == "Add Students and Reset Probability Points"){
        reset = true;
        //resetChoice = true;
        document.getElementById("textBox2").innerHTML="<p>Enter the names of the students you would like to add below. Enter one student per line. Do not skip lines.<p id='checkNum'>Submitting will save the changes.</p></p><textarea rows='3' cols='55' id='textareaId2'></textarea><br><input type='submit' onclick='addNames()' id='numb2' required><p id='displayError'></p>";    
    }
    
    else if(editOption == "Remove Students"){
        document.getElementById("textBox2").innerHTML="<p>Choose the student whom you would like to remove from the set. You can only remove one student at a time.</p><select name='select2' id='menu3' onChange='removeName()'><option>Click Me to Remove a Student</option></select>"
        
    var i = 0;
  
    while (i < names.length){
        
        var opt = document.createElement("option");
        document.getElementById("menu3").options.add(opt);
        opt.text = names[i];
        opt.value = i;
        
        i++; 
    }    
    }
    
    else if(editOption == "Remove Students and Reset Probability Points"){
        reset = true;
        //resetChoice = true;
        document.getElementById("textBox2").innerHTML="<p>Choose the student whom you would like to remove from the set. You can only remove one student at a time.</p><select name='select2' id='menu3' onChange='removeName()'><option>Click Me to Remove a Student</option></select>"
        
    var i = 0;
  
    while (i < names.length){
        
        var opt = document.createElement("option");
        document.getElementById("menu3").options.add(opt);
        opt.text = names[i];
        opt.value = i;
        
        i++; 
    }  
    }
    
    else if(editOption == "Reset Probability Points"){
        resetChoice = true;
        resetPoints();    
    }
}

function removeName(){
    //alert("entered function");
    var i = document.getElementById("menu3").value; 
    names.splice(i, 1);
    pointsArray.splice(i, 1);
    numStudents = numStudents*1.0 - 1;
    //alert(numStudents);
    //alert(names[1]);
    if(reset){
        //alert("in if else statement");
        resetPoints();
    }
    //alert("test");
    selectStudentScreen();
}


function addNames(){
    namesEditList =  document.getElementById('textareaId2').value.split(/\n/g);   
    
    for(var i = 0; i < namesEditList.length; i++){
        
        if (namesEditList[i] != ""){
            names.push(namesEditList[i]);
        }
        else{
            namesEditList.splice(i, 1); 
            i--;
        }
    }
    numStudents = numStudents*1.0 + namesEditList.length;
    for(var i = 0; i < namesEditList.length; i++){
        pointsArray.push(Number(numStudents));    
    }
    if(reset){
        resetPoints();
    }
    selectStudentScreen();
}

function resetPoints(){
    //alert("in reset function");
    for(var i = 0; i < numStudents; i++){
        pointsArray[i] = Number(numStudents);   
        //alert("in loop");
    }
    //alert("out of loop");
    if (resetChoice){
        selectStudentScreen();    
    }
    
}

function saveAs(){
    //  storageName = prompt("Save set as", "Example: Period 3 - 2015");
    

     
     
        countItemsInMenu++;
        if (storageNames == "" || storageNames == null){
            storageNames = storageName;    
        }
        else{
            storageNames += "#$`" + storageName;
        }
        
     
     
    save();
}
function save(){
    //askToSave = false;
    // if (storageName == null || storageName == ""){
    //     saveAs();    
    // }
    // else{
    namesString = names[0];
    for (var i = 1; i < names.length; i++){
        namesString += "@#$`" + names[i];    
    }
    pointsString = pointsArray[0];
    for (var i = 1; i < pointsArray.length; i++){
        pointsString += "@#$`" + pointsArray[i];    
    }
    localStorage.setItem("names_" + storageName, namesString);
    localStorage.setItem("points_" + storageName, pointsString);
    localStorage.setItem("numStudents_" + storageName, numStudents);
    localStorage.setItem("selectedStudent_" + storageName, selectedStudent);
    localStorage.setItem("startIndex_" + storageName, startIndex);
    localStorage.setItem("countSelections_" + storageName, countSelections);
    localStorage.setItem("storageNames", storageNames);
    
}

function openExisting(){
    shouldDeleteSet = false;
    document.body.style.backgroundImage="none";
document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='pitch'>Open Set</p><p id='openpage'></p><div align='center'><select name='select1' id='menu' onChange='openSet()'><option>Click Me</option></select><br><button type='button' onclick='start()' class='openpagebuttons'>Create Set</button><button type='button' onclick='home()' class='openpagebuttons'>Home Page</button><button type='button' onclick='deleteSet()' class=openpagebuttons' id='deleteButton'>Delete Set</button></div>";    
    var i = 0;
    namesToAdd = storageNames.split("#$`");
  
    while (i < namesToAdd.length){
        if (namesToAdd[i] != "" && namesToAdd[i] != null){
        var opt = document.createElement("option");
        document.getElementById("menu").options.add(opt);
        opt.text = namesToAdd[i];
        opt.value = namesToAdd[i];
        }
        i++; 
    }
    if (namesToAdd.length == 0){
        document.getElementById("openpage").innerHTML="No sets have been saved on this browser."; 
    }
    else{
        document.getElementById("openpage").innerHTML="Please select the name of the set you would like to open.";    
    }
}

function openSet(){
    if (shouldDeleteSet){
        deleteSetFromList();    
    }
    else{
    storageName = document.getElementById("menu").value;
    namesString = localStorage.getItem("names_" + storageName);
    names = namesString.split("@#$`");
    
    pointsString = localStorage.getItem("points_" + storageName);
    pointsArray = pointsString.split("@#$`");
    
    numStudents = parseInt(localStorage.getItem("numStudents_" + storageName));
    selectedStudent = localStorage.getItem("selectedStudent_" + storageName);
    startIndex = parseInt(localStorage.getItem("startIndex_" + storageName));
    countSelections = parseInt(localStorage.getItem("countSelections_" + storageName));
    
    document.getElementById("entire").innerHTML="<p id='head'>Student Selector</p><p id='displayStudent'>" + selectedStudent +"</p><p id='displayNumSelections'>Number of students selected: " + countSelections + "</p><div class='helppage'><button type='button' onclick='selectStudent()' id='nextStudentButton'>Next Student</button><br><br><button type='button' class='initpagebuttons' onclick='edit()'>Edit Set</button><button type='button' class='initpagebuttons' onclick='home()'>Home Page</button></div>";
    }
}

function deleteSet(){
    shouldDeleteSet = true;
    document.getElementById("openpage").innerHTML="Please select the name of the set you would like to DELETE."; 
    document.getElementById("pitch").innerHTML="Delete Set";
        
    var element = document.getElementById("deleteButton");
    element.parentNode.removeChild(element);
}

function deleteSetFromList(){
    nameToDelete = document.getElementById("menu").value;       var b = confirm("Are you sure you would like to delete the following set: " + nameToDelete);
    if (b){
        storageNames = storageNames.replace(nameToDelete, "");
        localStorage.setItem("storageNames", storageNames);
        openExisting();
    }
}