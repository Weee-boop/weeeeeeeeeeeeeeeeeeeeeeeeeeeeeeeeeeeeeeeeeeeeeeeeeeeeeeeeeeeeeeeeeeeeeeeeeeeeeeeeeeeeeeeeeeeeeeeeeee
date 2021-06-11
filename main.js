prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version;',ml5.version);
 
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/model.json',modelLoaded);

function modelLoaded(){
    console.log('model loaded!');
}

function speak(){
    var synth= window.speechSynthesis;
    speech_data_1= "The first prediction is" + Prediction_1;
    speech_data_2= "The second prediction is" + Prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        document.getElementById("result_emotion_name").innerHTML=Prediction_1;
        document.getElementById("result_emotion_name2").innerHTML=Prediction_2;
        speak();
        if(Prediction_1=="Best"){
            document.getElementById("update_emoji").innerHTML="👍";
        }
        if(Prediction_1=="Victory"){                                            
            document.getElementById("update_emoji").innerHTML="✌";
        }
        if(Prediction_1=="Amazing"){
            document.getElementById("update_emoji").innerHTML="👌";
        }
        if(Prediction_2=="Best"){
            document.getElementById("update_emoji2").innerHTML="👍";
        }
        if(Prediction_2=="Victory"){
            document.getElementById("update_emoji2").innerHTML="✌";
        }
        if(Prediction_2=="Amazing"){
            document.getElementById("update_emoji2").innerHTML="👌";
        }
    }
}


