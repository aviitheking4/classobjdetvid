img=""
statusobjdet=""
objects=[];
function preload() {
    img=loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(640, 440);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(640,440)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("stats").innerHTML = "Status : detecting objects";
}

function draw() {
    image(video, 0,0,640,440);
    
    if(statusobjdet !="")
    {
        r = random(255)

        g = random(255)

        b = random(255)

        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++ ){
            document.getElementById("stats").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects that are :"+ objects.length;
            
            fill(r,g,b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15 )
            noFill();
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function modelLoaded() {
    console.log("model loaded")
    statusobjdet = true;
}

function gotResult(error , results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
