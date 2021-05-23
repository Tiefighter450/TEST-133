var i;
objects = [];
percent = 0;
img = "";
textInputImg = "";
status = false;
function go() {
    textInputImg = document.getElementById("image").value;
}
function preload() {
    img = loadImage(textInputImg);
}
function setup() {
    canvas = createCanvas(640, 398);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(img, 0, 0, 640, 398);
    canvas.center();
    if ((status != false) && (textInputImg != "")) {
        for (i = 0; i < objects.length; i++) {
            stroke('red');
            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}