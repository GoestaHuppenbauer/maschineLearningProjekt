let pcOptions, start, drei , zwei, eins, schere, stein, papier;
let options = [];
let computer="";
let human = "";



let featureExtractor,classifier,video;
let label = '';

function preload() {
    start = loadImage('images/start.jpg');
    drei = loadImage('images/3.svg');
    zwei = loadImage('images/2.svg');
    eins = loadImage('images/1.svg');
    schere = loadImage('images/schere.jpg');
    stein = loadImage('images/stein.jpg');
    papier = loadImage('images/papier.jpg');
    options=[schere,stein,papier];
    options_string=['schere','stein','papier'];
}
function setup() {
    createCanvas(300,300);
    video = createCapture(VIDEO);
    //video.hide();
    
    featureExtractor = ml5.featureExtractor('mobilenet',{numLabels:3}, modelReady);
    classifier = featureExtractor.classification(video, videoReady);}

function draw() {
    background(start);
    fill(255);
    textSize(16);
}

function startGame(){
  myVar = setTimeout(dreiFunction, 1000);
  console.log("Start Game");}

function dreiFunction() {
  console.log("Drei");
    background(drei);
    myVar = setTimeout(zweiFunction, 1000);
    
}
function zweiFunction() {
    console.log("Zwei");
    background(zwei);
    myVar = setTimeout(einsFunction, 1000);
}
function einsFunction() {
    console.log("Eins");
   background(eins);
    myVar = setTimeout(displayRandom, 1000);
}
function displayRandom() {
    var randomNumber = Math.floor(Math.random() * (+3 - +0)) + +0; 
     computer = options_string[randomNumber];
    background(options[randomNumber]);
    
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
    gotResults();
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
    
    if (result && result[0]) {
        label = result[0].label;
        human=label;
        
        win();
      }
      
    
  }
}

  
function win(){

    
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
                console.loadImage("Nutzer gewinnt mit stein");
            }
            else if(pcOptions == "schere"  &&   userOptions == "stein"){
                console.log("Nutzer gewinnt mit schere");
            }
            else if(pcOptions == "stein"  &&   userOptions == "papier"){
               console.log("Nutzer gewinnt mit papier");
            }
            else {console.log("Kein Spiel");}
    }