
let mobilenet;
let classifier;
let video;
let label = '';
let schereButton;
let steinButton;
let papierButton;
let trainButton;
let saveButton;

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

function whileTraining(loss) {
  
  if (loss == null) {
    //Ist der Loss == NULL kann die prediction losgehen
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    //beim trainieren wird der Loss ausgegeben
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.log("Error")
  } else {
    label = result;
    console.log(result)
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  //BUTTON == SCHERE
  schereButton = createButton('schere');
  schereButton.mousePressed(function() {
    classifier.addImage('schere');
  });
//BUTTON STEIN
  steinButton = createButton('stein');
  steinButton.mousePressed(function() {
    classifier.addImage('stein');
  });
//BUTTON PAPIER
  papierButton = createButton('papier');
  papierButton.mousePressed(function() {
    classifier.addImage('papier');
  });
//BUTTON TRAIN
  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

//BUTTON SAVE
saveButton = createButton('save');
saveButton.mousePressed(function() {
  classifier.save()
    .catch(e => select("#statusModelSave").html(e.message));
});
//BUTTON LOAD
loadButton = createButton('load');
//hier wird die Lade Funktion von Steffen aufgerufen
loadButton.mousePressed(handleModelLoad);
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
  
} 