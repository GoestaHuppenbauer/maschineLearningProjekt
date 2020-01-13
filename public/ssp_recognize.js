
let mobilenet;
let classifier;
let video;
let label = '';
let schereButton;
let steinButton;
let papierButton;
let trainButton;
let saveButton;


function handleModelLoad() {
  // when loading from a URL
  // regressor.load("./weights/model.json").then(() => select("#statusModelLoad").html("Model loaded."));
  
  // loading from user selected files
  let files = select("#modelFiles").elt.files;
  if(files == null || files.length < 2) {
    select("#statusModelLoad").html("You need to choose model and weights files.")
  } else {
    classifier.load(files).then(() => select("#statusModelLoad").html("Model loaded."));
    customModelReady();
    
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
    console.error(error);
  } else {
    label = result;
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




saveButton = createButton('save');
saveButton.mousePressed(function() {
  classifier.save()
    .catch(e => select("#statusModelSave").html(e.message));
});

loadButton = createButton('load');
loadButton.mousePressed(handleModelLoad);
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
  
} 