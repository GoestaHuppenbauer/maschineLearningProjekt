

let pcOptions, start, drei , zwei, eins, schere, stein, papier,featureExtractor,classifier,video,cnv;;
let options = [];
let computer="";
let human = "";
let label = "";
let game = false;
let round =0;
let newPlayers = {};
var userOptions;
let data = {}; // Global object to hold results from the loadJSON call
let players = []; // Global array to hold all player objects
let players_array = []; // Global array to hold all player objects
let currentGame = {'username':'','points':[0,0,0],'hand':["","",""]};






function preload() {
  //Preload wird noch vor dem Setup aufgerufen und lädt alle ressourcen
    data = loadJSON('players.json');
    start = loadImage('images/start.jpg');
    zwei = loadImage('images/2.svg');
    eins = loadImage('images/1.svg');
    schere = loadImage('images/schere.svg');
    stein = loadImage('images/stein.svg');
    papier = loadImage('images/papier.svg');
    options=[schere,stein,papier];
    options_string=['schere','stein','papier'];
}
function setup() {
    //Sobald alles geladen ist wird die Setup aufgerufen.
    loadData(); //hier wird die Funktion loadData aufgerufen welche das Json mit den Spielern verarbeitet
    cnv = createCanvas(300,300); //Auf dem Canvas wird für den User der aktuelle Stand im Spiel angezeigt
    cnv.position((windowWidth/2)-150,(windowHeight/2)-150);
    cnv.background(start);
    video = createCapture(VIDEO); //für die Bilderkennung wird die Webcam abgefragt
    video.hide(); //Damit das Webcambild nicht ablenkt wird es ausgeblendet
    featureExtractor = ml5.featureExtractor('mobilenet',{numLabels:3}, modelReady); //Der Feature Extractor wird definiert
    classifier = featureExtractor.classification(video, videoReady);  
}

function draw() {
    
  
}
function newGame(){
  //Hat ein neuer Spieler seinen Namen eingetragen wird die Maske wieder ausgeblendet
  var inputField = document.getElementById("myOverlay");
  inputField.style.display="none";
  let nickname = document.getElementById("username").value; //Der Wert des Namens wird eingeholt
  currentGame.username = nickname; //Und an das Objekt des aktuellen Spiels übergeben
  
}


function startGame(){
  //Drückt der Spieler auf GameStart beginnt der CountDown
  document.getElementById("startGameButton").disabled = true;
  myVar = setTimeout(zweiFunction, 1000);
  console.log("Start Game");
}

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
  //Diese Funktion könnte auch startPrediction heißen, sie beginnt mit der Bilderkennung
    gotResults();
    classifier.classify(gotResults);  
}




function handleModelLoad() {
  //Die Funktion lädt ein schon trainiertes Modell
  let files = select("#modelFiles").elt.files;// Hier werden Files aus dem Html übergeben
  
  if(files == null || files.length < 2) {
    //Überprüfung ob auch zwei Dateien angehängt sind
    //Falls nur eine Datei angehängt ist kommt eine Meldung
    select("#statusModelLoad").html("You need to choose model and weights files.")
  } else {
    classifier.load(files).then(() => select("#statusModelLoad").html("Model loaded."));//Wenn die Modell Dateien geladen sind wird das ausgegeben
    //Hier wird die Modell geladen Funktion aufgerufen 
    customModelReady();
    
    
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
    //Damit es keine Fehlermeldung gibt beim ausseinander friemeln des result-objects wird vorher überprüft ob überhaupt Ergebnisse reinkommen
    if (result && result[0]  ) {
        label = result[0].label;
        human=label;
        win(); //Gibt es Ergebnisse wird die win() funktion aufgerufen
      }
      
    
  }
}

  
function win(){
  //Diese Funktion klärt wer die aktuelle Runde gewinnt.
  var randomNumber = Math.floor(Math.random() * (+3 - +0)) + +0; 
  computer = options_string[randomNumber];
    cnv.background(options[randomNumber]);
    var pcOptions = computer;
    userOptions = human;
    console.log("Computer: "+pcOptions);
    console.log("Spieler: "+userOptions);

    
        if(pcOptions == userOptions){
           console.log("unentschieden");
           unentschieden();
            //papier
        }else if (pcOptions == "papier" && userOptions == "stein"){
            console.log("bot gewinnt mit papier");
            youLose();
            }//schere
            else if(pcOptions == "schere" &&   userOptions == "papier"){
               console.log("bot gewinnt mit schere");
               youLose();
            }//stein
            else if(pcOptions == "stein"  &&   userOptions == "schere"){
                console.log("bot gewinnt mit stein");
                youLose();
            }
            else if(pcOptions == "papier"  &&   userOptions == "schere"){
                console.log("Nutzer gewinnt mit stein");
                youWin();
            }
            else if(pcOptions == "schere"  &&   userOptions == "stein"){
                console.log("Nutzer gewinnt mit schere");
                youWin();
            }
            else if(pcOptions == "stein"  &&   userOptions == "papier"){
               console.log("Nutzer gewinnt mit papier");
               youWin();
            }
            else {console.log("Kein Spiel");}
            
            
            
            document.getElementById("startGameButton").disabled = false;
          }


function loadData() {
  //Beim Setup werden die Daten der bisherigen Liste aufgerufen und direkt in eine Tabelle geschrieben
      
      
      players = data['players'];
      
      
      
      
      
      for (let i = 0; i < players.length; i++) {
        // Get each object in the array
        let player = players[i];
        let username = player['username'];
        let points = player['points'];
        
        let points_table = 0;
        for(var rounds_i = 0;rounds_i<=2;rounds_i++){
         let pointsPerRound =  points[rounds_i]*10;
         
         points_table = points_table + pointsPerRound;
        }
        
        let timestamp = player['timestamp'];
        var table = document.getElementById("myTable");
        
        var row = table.insertRow(1);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = username;
        cell2.innerHTML = points_table;

    
        // Put object in array
        //players_array.push({username,points, timestamp});
       
      }
    }
function youLose(){
  
  console.log("You Lose");
  document.body.style.background = "red";
  if(round>3){
    console.log("Game is over");
    
    setTimeout(backToWhite, 500);
    
  }
  else {
    currentGame.points[round] = -1;
    currentGame.hand[round] = human;
    console.log(currentGame);
    eclipseBuild = "circle"+(round+1);
    console.log(eclipseBuild);
    document.getElementById(eclipseBuild).style.background = "red";
    
    setTimeout(backToWhite, 500);
    
  }
  
  
    };

function unentschieden(){
  
      console.log("Unentschieden");
      document.body.style.background = "yellow";
      if(round>3){
        console.log("Game is over");
        
        setTimeout(backToWhite, 500);
        
      }
      else {
        currentGame.points[round] = 0;
        currentGame.hand[round] = human;
        console.log(currentGame);
        eclipseBuild = "circle"+(round+1);
        console.log(eclipseBuild);
        document.getElementById(eclipseBuild).style.background = "yellow";
        
        setTimeout(backToWhite, 500);
       
      }
      
      
        };

function youWin(){
  
  console.log("You Win");
  document.body.style.background = "green";
  if(round>3){
    
    console.log("Game is over");
    
    setTimeout(backToWhite, 500);
    
  }
  else{
    currentGame.points[round] = 1;
    currentGame.hand[round] = human;
    console.log(currentGame);
    eclipseBuild = "circle"+(round+1);
    console.log(eclipseBuild);
    document.getElementById(eclipseBuild).style.background = "green";
    
    setTimeout(backToWhite, 500);
    
  }
  
  
};

function backToWhite(){
  
  document.body.style.background = "white";
  round= round+1;
  if(round>=3){
    
   endGame();
    
    
    
  }

};

var finish = function() {
    console.log("Saved to json");
  
};


function endGame(){
  document.getElementById("circle1").style.background = "#555";
  document.getElementById("circle2").style.background = "#555";
  document.getElementById("circle3").style.background = "#555";
  cnv.background(start);
  console.log("Game Ende");
  
  console.log(data);
  players[players.length] = currentGame;
  data.players = players;
  console.log(data);
  saveJSON(data, 'players.json');

}