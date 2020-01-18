let pcOptions, start, drei , zwei, eins, schere, stein, papier;
let options = [];
let computer="";
let human = "";
let game = false;

let data = {}; // Global object to hold results from the loadJSON call
let players = []; // Global array to hold all bubble objects
let players_array = []; // Global array to hold all bubble objects


let featureExtractor,classifier,video,cnv;
let label = '';





function preload() {
    data = loadJSON('players.json');
    start = loadImage('images/start.jpg');
    zwei = loadImage('images/2.svg');
    eins = loadImage('images/1.svg');
    schere = loadImage('images/schere.jpg');
    stein = loadImage('images/stein.jpg');
    papier = loadImage('images/papier.jpg');
    options=[schere,stein,papier];
    options_string=['schere','stein','papier'];
}
function setup() {
    
    loadData();
    cnv = createCanvas(300,300);
    cnv.position((windowWidth/2)-150,(windowHeight/2)-150);
    cnv.background(start);
    video = createCapture(VIDEO);
    video.hide();
    
    featureExtractor = ml5.featureExtractor('mobilenet',{numLabels:3}, modelReady);
    classifier = featureExtractor.classification(video, videoReady);}

function draw() {
    
    fill(255);
    textSize(16);
  
}

function startGame(){
  
  
  var inputField = document.getElementById("myOverlay");
  inputField.style.display="none";
  myVar = setTimeout(zweiFunction, 1000);
  console.log("Start Game");}



function zweiFunction() {
  console.log("Zwei");
  cnv.background(zwei);
  myVar = setTimeout(einsFunction, 1000);
  
}
function einsFunction() {
    console.log("Eins");
    cnv.background(eins);
    myVar= setTimeout(displayRandom,1000);
}
function displayRandom() {
    
    
    
    gotResults();
    classifier.classify(gotResults);  
}



//Die Funktion lädt ein schon trainiertes Modell
function handleModelLoad() {
  // Hier werden Files aus dem Html übergeben
  let files = select("#modelFiles").elt.files;
  //Überprüfung ob auch zwei Dateien angehängt sind
  if(files == null || files.length < 2) {
    //Falls nur eine Datei angehängt ist kommt eine Meldung
    select("#statusModelLoad").html("You need to choose model and weights files.")
  } else {
    //Wenn die Modell Dateien geladen sind wird das ausgegeben
    classifier.load(files).then(() => select("#statusModelLoad").html("Model loaded."));
    //Hier wird die Modell geladen Funktion aufgerufen 
    customModelReady();
    //Hier wird Prediction gestartet
    
    var inputField = document.getElementById("myOverlay");
    inputField.style.display="block";
  }
}

function modelReady() {
  console.log('Model is ready!!!');
}

function customModelReady(){
  console.log('Custom Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}



function gotResults(error, result) {
  if (error) {
    console.log("Error")
  } else {
    
    if (result && result[0]  ) {
        label = result[0].label;
        human=label;
        win();
      }
      
    
  }
}

  
function win(){
  var randomNumber = Math.floor(Math.random() * (+3 - +0)) + +0; 
  computer = options_string[randomNumber];
    cnv.background(options[randomNumber]);
    var pcOptions = computer;
    var userOptions = human;
    console.log("Computer: "+pcOptions);
    console.log("Spieler: "+userOptions);

    
        if(pcOptions == userOptions){
           console.log("unentschieden");
            //papier
        }else if (pcOptions == "papier" && userOptions == "stein"){
            console.log("bot gewinnt mit papier");
            }//schere
            else if(pcOptions == "schere" &&   userOptions == "papier"){
               console.log("bot gewinnt mit schere");
            }//stein
            else if(pcOptions == "stein"  &&   userOptions == "schere"){
                console.log("bot gewinnt mit stein");
            }
            else if(pcOptions == "papier"  &&   userOptions == "schere"){
                console.log("Nutzer gewinnt mit stein");
            }
            else if(pcOptions == "schere"  &&   userOptions == "stein"){
                console.log("Nutzer gewinnt mit schere");
            }
            else if(pcOptions == "stein"  &&   userOptions == "papier"){
               console.log("Nutzer gewinnt mit papier");
            }
            else {console.log("Kein Spiel");}
    }


    function loadData() {
      let players = data['players'];
      for (let i = 0; i < players.length; i++) {
        // Get each object in the array
        let player = players[i];
        let username = player['username'];
        let points = player['points'];
        let timestamp = player['timestamp'];
        var table = document.getElementById("myTable");
        print(table.rows);
        var row = table.insertRow(1);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = username;
        cell2.innerHTML = points;

    
        // Put object in array
        //players_array.push({username,points, timestamp});
        
        console.log(username);
      }
    }