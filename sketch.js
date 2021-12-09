// implementation of the model and classify 'happy' and 'wrong' in real-time video capture

let canvas;
let video;
let faceapi;
let EmoClassifier;
let detections = [];
let points = [];
let pointsX, pointsY;
let inputs = [];
let labels = [];
let score;
let xStart = 0;

function setup() {
    canvas = createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    const faceOptions = {
        withLandmarks: true,
        withExpressions: true,
        withDescriptors: false,
        minConfidence: 0.5,
    };
    //faecapi to deteect landmarks of face
    faceapi = ml5.faceApi(video, faceOptions, faceReady);

    let options = {
        inputs: 136,
        outputs: 2,
        task: "classification",
        debug: true,
    }
    EmoClassifier = ml5.neuralNetwork(options);
    const modelDetails = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin'
    }
    //loading the model
    EmoClassifier.load(modelDetails, modelLoaded);
}

function faceReady() {
    console.log("faceApi is loaded!");
}
function modelLoaded() {
    console.log('model is loaded!');
}

function detectFace() {
    faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
    if (error) {
        console.log(error);
        return;
    }
    else {
        detections = result;
        EmotionClassify(result);
    }
}

function EmotionClassify(detections) {
    if (detections.length > 0) {
        for (let i = 0; i < detections.length; i++) {
            points = detections[i].landmarks._positions;
        }
        for (let f = 0; f < points.length; f++) {
            pointsX = points[f]._x;
            pointsY = points[f]._y;
            inputs.push(pointsX);
            inputs.push(pointsY);
        }
        EmoClassifier.classify(inputs, gotResults);
    }
}

function gotResults(error, result) {
    if (error) {
        console.log(error);
        return
    }
    else {
        labels = result[0].label;
        score = result[0].confidence;
        return
    }
}

function draw() {
    background(0);
    drawText();
    detectFace();

    // borders
    fill(200, 0, 0);
    rect(0, 0, 5, height);
    rect(width - 5, 0, 5, height);
    rect(0, 0, width, 5);
    rect(0, height - 5, width, 5);

    translate(video.width, 0);
    scale(-1, 1);
    tint(255, round(score * 100) * 2.5);
    image(video, 0, 0);


    if (labels == 'wrong') {
        score -= 0.05;
    }
    else if (labels == 'happy') {
        score += 0.05;
    }
}

function drawText() {
    textAlign(CENTER, CENTER);
    textFont("monospace");
    textSize(15);
    for (let x = xStart; x < width; x += 50) {
        fill(x * 3, 10, 20);
        text('SM_LE', x, height - 20);
    }
    xStart--;
}