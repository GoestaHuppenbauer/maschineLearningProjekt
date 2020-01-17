let img, start, drei , zwei, eins, schere, stein, papier, human;
let options = [];



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
}
function setup() {
    createCanvas(300,300);
    video = createCapture(VIDEO);
    video.hide();
    
    featureExtractor = ml5.featureExtractor('mobilenet',{numLabels:3}, modelReady);
    classifier = featureExtractor.classification(video, videoReady);}

function draw() {
    background(start);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);}
function startGame(){myVar = setTimeout(dreiFunction, 1000);}

function dreiFunction() {
    background(drei);
    myVar = setTimeout(zweiFunction, 1000);
}
function zweiFunction() {
    background(zwei);
    myVar = setTimeout(einsFunction, 1000);
}
function einsFunction() {
   background(eins);
    myVar = setTimeout(displayRandom, 1000);
}
function displayRandom() {
    var randomNumber = Math.floor(Math.random() * (+3 - +0)) + +0; 
    var computer = options[randomNumber];
    background(options[randomNumber]);
    win();
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
        human=label;}
    
    classifier.classify(gotResults);
  }
}

  
function win(){
    var pcOptions = computer;
    var userOptions = human;

    
        if(img[i] == userOptions){
            Window.alert("unentschieden");
            //papier
        }else if (img == "papier" && userOptions == "stein"){
            Window.alert("bot gewinnt mit papier");
            }//schere
            if(img == "schere" &&   userOptions == "papier"){
                Window.alert("bot gewinnt mit schere");
            }//stein
            if(img == "stein"  &&   userOptions == "schere"){
                Window.alert("bot gewinnt mit stein");
            }
            if(img == "papier"  &&   userOptions == "schere"){
                Window.alert("Nutzer gewinnt mit stein");
            }
            if(img == "schere"  &&   userOptions == "stein"){
                Window.alert("Nutzer gewinnt mit schere");
            }
            if(img == "stein"  &&   userOptions == "papier"){
                Window.alert("Nutzer gewinnt mit papier");
            }
        
    }