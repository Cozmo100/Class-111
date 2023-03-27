Webcam.set({
    width: 350, height: 300, image_format: "png", png_quality: 90
})

camera = document.getElementById('camera');

Webcam.attach("#camera");

function CaptImg(){
    Webcam.snap(function(data_uri){
        document.getElementById('sv').innerHTML = "<img id='fp' src="+data_uri+">";
    })
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Dbg3MLxdf/model.json');

function modelLoaded() {
    console.log('Model has been loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function RecImg(){
    img = document.getElementById('fp');
    classifier.classify(img,gotResults);
}
function gotResults(error,results){
    if(error) {
        console.log(error)
    }
    else{
        console.log(results)
        document.getElementById('emojiname1').innerHTML = results[0].label;
        if(results[0].label == "Happy"){
            document.getElementById("emoji1").innerHTML = "😀";
        }
        else if(results[0].label == "Sad"){
            document.getElementById('emoji1').innerHTML = "😞";
        }
        else if(results[0].label == "Angry"){
            document.getElementById('emoji1').innerHTML = "😣";
        }
        document.getElementById('emojiname2').innerHTML = results[1].label;
        if(results[1].label == "Happy"){
            document.getElementById("emoji1").innerHTML = "😀";
        }
        else if(results[1].label == "Sad"){
            document.getElementById('emoji1').innerHTML = "😞";
        }
        else if(results[1].label == "Angry"){
            document.getElementById('emoji1').innerHTML = "😣";
        }
    }
}
