// the collection of face landmarks to build the training dataset

let Himg = [];
let Wimg = [];

let faceapi;
let detectionsH = [];
let detectionsW = [];

let pointsH = [];
let pointsW = [];


let dataset = {
  'data': [],
}

let canvas;

const faceOptions = {
  withLandmarks: true,
  withExpressions: true,
  withDescriptors: false,
};


// loading dataset
function preload() {
  for (let i = 1; i < 51; i++) {
    Himg[i - 1] = loadImage('img/happy/' + i + '.jpg', imageLoaded);
    Wimg[i - 1] = loadImage('img/wrong/' + i + '.jpg', imageLoaded);
  }
}

function imageLoaded() {
  console.log('images are loaded');
}

function setup() {
  canvas = createCanvas(400, 400);
  faceapi = ml5.faceApi(faceOptions, faceReady);
}

function faceReady() {
  console.log('ready');
  for (let i = 0; i < Himg.length; i++) {
    faceapi.detect(Himg[i], gotFacesH);
  }
  for (let f = 0; f < Wimg.length; f++) {
    faceapi.detect(Wimg[f], gotFacesW);
  }
}

function gotFacesH(error, result) {
  if (error) {
    console.log(error);
    return;
  } else {
    detectionsH.push(result);
    saveLandmarksH(detectionsH);
  }
}

function gotFacesW(error, result) {
  if (error) {
    console.log(error);
    return;
  } else {
    detectionsW.push(result);
    saveLandmarksW(detectionsW);
  }
}

function saveLandmarksH(detectionsH) {
  for (let i = 0; i < detectionsH.length; i++) {
    pointsH = detectionsH[i][0].landmarks._positions;
  }
  for (let f = 0; f < pointsH.length; f++) {
    dataset.data.push({ 'x': pointsH[f]._x, 'y': pointsH[f]._y, 'label': 'happy' });
  }
}

function saveLandmarksW(detectionsW) {
  for (let i = 0; i < detectionsW.length; i++) {
    pointsW = detectionsW[i][0].landmarks._positions;
  }
  for (let f = 0; f < pointsW.length; f++) {
    dataset.data.push({ "x": pointsW[f]._x, "y": pointsW[f]._y, "label": "wrong" });
  }
  console.log("Pushed!")
  if (dataset.data.length >= 6800) {
    saveData();
  }
}

function saveData() {
  console.log('saving...');
  saveJSON(dataset, 'dataset.json');
}
