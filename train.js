// training the model

let EmoClassifier;

function setup() {
    let options = {
        dataUrl: 'dataset/dataset.json',
        task: 'classification',
        inputs: ['x', 'y'],
        outputs: ['label'],
    }
    EmoClassifier = ml5.neuralNetwork(options, dataLoaded);
}

function dataLoaded() {
    console.log('Training data loaded');
    EmoClassifier.normalizeData();
}

function keyPressed() {
    if (key == "t") {
        train();
    }
}

function train() {
    EmoClassifier.train({ epochs: 50 }, finishedTraining);
}


function finishedTraining() {
    console.log("training is finished");
    EmoClassifier.save();
}





//   trainButton.mousePressed(function() {
//     classifier.train(whileTraining);
//   });

// function modelReady() {
//   console.log('Model is ready!!!');
// }


// function whileTraining(loss) {
//   if (loss == null) {
//     console.log('Training Complete');
//     classifier.classify(gotResults);
//   } else {
//     console.log(loss);
//   }
// }

// function gotResults(error, result) {
//   if (error) {
//     console.error(error);
//   } else {
//     // updated to work with newer version of ml5
//     // label = result;
//     label = result[0].label;
//     classifier.classify(gotResults);
//   }
// }

// function setup() {
//   createCanvas(320, 270);
//   video = createCapture(VIDEO);
//   video.hide();
//   background(0);
//   mobilenet = ml5.featureExtractor('MobileNet', modelReady);
//   classifier = mobilenet.classification(video, videoReady);

//   ukeButton = createButton('happy');
//   ukeButton.mousePressed(function() {
//     classifier.addImage('happy');
//   });

//   whistleButton = createButton('sad');
//   whistleButton.mousePressed(function() {
//     classifier.addImage('sad');
//   });

//   trainButton = createButton('train');
//   trainButton.mousePressed(function() {
//     classifier.train(whileTraining);
//   });
// }

// function draw() {
//   background(0);
//   image(video, 0, 0, 320, 240);
//   fill(255);
//   textSize(16);
//   text(label, 10, height - 10);
// }

