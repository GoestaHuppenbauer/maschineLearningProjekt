window.onload = function(){
    this.console.log("Test");
    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("start");
    ctx.drawImage(img,0,0,img.clientWidth,img.clientHeight)
}

function startGame(){
    myVar = setTimeout(drei, 1000);
}
function drei() {
    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext("2d");
    this.console.log("3");
    var img = document.getElementById("drei");
    ctx.drawImage(img,0,0,img.clientWidth,img.clientHeight);
    myVar = setTimeout(zwei, 1000);
}
function zwei() {
    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext("2d");
    this.console.log("2");
    var img = document.getElementById("zwei");
    ctx.drawImage(img,0,0,img.clientWidth,img.clientHeight);
    myVar = setTimeout(eins, 1000);
}

function eins() {
    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext("2d");
    this.console.log("1");
    var img = document.getElementById("eins");
    ctx.drawImage(img,0,0,img.clientWidth,img.clientHeight);
    myVar = setTimeout(displayRandom, 1000);
}

function displayRandom() {
    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext("2d");
    this.console.log("1");
    var options = ["schere","stein","papier"];
    var randomNumber = Math.floor(Math.random() * (+3 - +0)) + +0; 
    this.console.log(randomNumber);
    var img = document.getElementById(options[randomNumber]);
    ctx.drawImage(img,0,0,img.clientWidth,img.clientHeight);
    
}