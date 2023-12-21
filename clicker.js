let circle = document.getElementById("circle");
let duration;
let sizes = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250];
let size;
let colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "grey", "brown", "aqua", "pink", "maroon", "navy", "teal", "olive", "beige", "darkgreen", "indigo", "gold"];
let color;
let w = window.innerWidth/10;
let h = window.innerHeight/5;
let XPositions = [w/2, w, w*2, w*3, w*4, w*5, w*6, w*7, w*8, w*9];
let XPosition;
let YPositions = [h/2, h, h*1.5, h*2, h*2.5, h*3, h*3.5, h*4, h*4.5];
let YPosition;
let hits;
let misses;
let popup = document.getElementById("popup");
let popupYPos = 400;
let score = document.getElementById("score");
let headingOne = document.getElementById("headingOne");
let headingTwo = document.getElementById("headingTwo");
let flag = false;
let colorsOnWhite = document.getElementById("colorsOnWhite");
let blackOnWhite = document.getElementById("blackOnWhite");
let colorsOnBlackId = document.getElementById("colorsOnBlackId");
let whiteOnBlack = document.getElementById("whiteOnBlack");

function normalColors() {
    colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "grey", "brown", "aqua", "pink", "maroon", "navy", "teal", "olive", "beige", "darkgreen", "indigo", "gold"];
    document.body.style.backgroundColor = "white";
    headingOne.style.color = "black";
    headingTwo.style.color = "black";
    headingOne.style.webkitTextStrokeColor = "blue";
    headingTwo.style.webkitTextStrokeColor = "red";
    colorsOnWhite.style.backgroundColor = "white";
    blackOnWhite.style.backgroundColor = "lightgrey";
    colorsOnBlackId.style.backgroundColor = "lightgrey";
    whiteOnBlack.style.backgroundColor = "lightgrey";
}

function blackColors() {
    colors = ["black"];
    document.body.style.backgroundColor = "white";
    headingOne.style.color = "black";
    headingTwo.style.color = "black";
    headingOne.style.webkitTextStrokeColor = "black";
    headingTwo.style.webkitTextStrokeColor = "black";
    colorsOnWhite.style.backgroundColor = "lightgrey";
    blackOnWhite.style.backgroundColor = "white";
    colorsOnBlackId.style.backgroundColor = "lightgrey";
    whiteOnBlack.style.backgroundColor = "lightgrey";
}

function reverseColors() {
    colors = ["white"];
    document.body.style.backgroundColor = "black";
    headingOne.style.color = "white";
    headingTwo.style.color = "white";
    headingOne.style.webkitTextStrokeColor = "black";
    headingTwo.style.webkitTextStrokeColor = "black";
    colorsOnWhite.style.backgroundColor = "lightgrey";
    blackOnWhite.style.backgroundColor = "lightgrey";
    colorsOnBlackId.style.backgroundColor = "lightgrey";
    whiteOnBlack.style.backgroundColor = "white";
}

function colorsOnBlack() {
    colors = ["red", "orange", "yellow", "green", "blue", "purple", "grey", "brown", "aqua", "pink", "maroon", "navy", "teal", "olive", "beige", "darkgreen", "indigo", "gold"];
    document.body.style.backgroundColor = "black";
    headingOne.style.color = "white";
    headingTwo.style.color = "white";
    headingOne.style.webkitTextStrokeColor = "blue";
    headingTwo.style.webkitTextStrokeColor = "red";
    colorsOnWhite.style.backgroundColor = "lightgrey";
    blackOnWhite.style.backgroundColor = "lightgrey";
    colorsOnBlackId.style.backgroundColor = "white";
    whiteOnBlack.style.backgroundColor = "lightgrey";
}

function scramble() {
    if(flag === false) {
        size = sizes[Math.floor(Math.random() * sizes.length)];
        color = colors[Math.floor(Math.random() * colors.length)];
        XPosition = XPositions[Math.floor(Math.random() * XPositions.length)];
        YPosition = YPositions[Math.floor(Math.random() * YPositions.length)];

        circle.style.backgroundColor = color;
        circle.style.width = size + "px";
        circle.style.height = size + "px";
        circle.style.top = YPosition + "px";
        circle.style.left = XPosition + "px";
    }
}

function begin(event) {
    if(event.key === "Enter") {
        duration = document.getElementById("duration").value;
        if(duration <= 0 || duration > 60 || duration === "" || duration.toString().includes(".")) {
            alert("Please use only positive numbers below 1 minute, with no decimals.");
        } else {
            document.getElementById("container").remove();
            window.removeEventListener("keyup", begin);
            startGame();
        }
    }
}

function endGame() {
    circle.style.cursor = "default";
    circle.style.backgroundColor = "grey";
    popup.style.display = "block";
    document.body.style.backgroundColor = "#f0f0f0";
    flag = true;

    if(misses === 0) {
        score.textContent = "You had " + hits + " hits, " + (misses-hits) + " misses, " + misses + " total clicks, and your CPS was 0";
    } else {
        score.textContent = "You had " + hits + " hits, " + (misses-hits) + " misses, " + misses + " total clicks, your accuracy was " + (hits/misses).toFixed(2) + " and your CPS was " + (hits/duration).toFixed(2);
    }
    
    popupAnimation = setInterval(function() {
        popupYPos -= 1;
        popup.style.bottom = popupYPos + "px";

        if(popupYPos === (size - 100)) {
            clearInterval(popupAnimation);
        }
    }, 1);
}

function startGame() {
    setTimeout(function() {
        endGame();
    }, duration * 1000);

    hits = 0;
    misses = 0;

    circle.style.display = "block";
    scramble();
}

document.onclick = function() {
    misses++;
}

circle.onclick = function() {
    hits++;
    scramble();
}

window.addEventListener("keyup", begin);