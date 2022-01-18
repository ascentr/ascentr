var arrElements = "";
var cndWordList = 'EXPLICATE, EXTORTION, FABRICATE, EXTROVERT, FALLOWING, alcoholic, abandoned, abilities, activated, adaptable, addicting, adulthood, aftermath, agreeably, alcoholic, alertness, alternate, amazement, amazingly, ambitious, ambitions, amphibian, amusingly, amusement, analytics, analyzing, enquiring, hijacking, squeezing, sabotaged, sacrifice, authentic, sarcastic, satisfied, attacking, defensive, downright, perplexed, beautiful, agonizing, wrenching, formation, objective, spherical, empirical, important, situation, craftable, yesterday'
var txt;
cndScore = 0;
var theMeaning = ""
myForm.input_answer.value = '';
document.getElementById("input_answer").disabled = true;
document.getElementById("bscore").innerHTML = localStorage.getItem("bestCscore");

var cndWordArray = cndWordList.split(','); // split string on comma space
document.getElementById("message").innerHTML = "Press start to generate a 9 word anagram conundrum"


var cndWord = cndWordArray[Math.floor(Math.random() * cndWordArray.length)]
cndWord = cndWord.trim() //remove white spaces
url = 'https://mydictionaryapi.appspot.com/?define=' + cndWord // for the dictionary api
cndWord = cndWord.toUpperCase()

var cndShuffle = cndWord.split(''); // empty string separator

var shuffle = function (array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// Get the meaning of the word from https://mydictionaryapi.appspot.com/?define=myword

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', url);
ourRequest.onload = function () {
    const resData = JSON.parse(this.responseText);
    console.log(ourRequest.status)

    theWord = resData[0].word
    let myMean1 = resData[0].meaning
    let myValues = Object.values(myMean1)

    if (Array.isArray(myValues) == true) {
        len = myValues.length

        for (i = 0; i < len; i++) {
            var meaning = myValues[i]
        }
    }

    theMeaning = "<span class='word'>" + theWord + " :</span> " + meaning[0].definition
    return theMeaning;
}

ourRequest.send();

var conundrum = shuffle(cndShuffle);

function generateCon(conundrum) {
    document.getElementById("message").innerHTML = ''
    timer()
    len = conundrum.length;
    for (i = 0; i < len; i++) {
        var btn = document.createElement("button")
        btn.setAttribute('value', conundrum[i])
        btn.innerHTML = conundrum[i]
        btn.setAttribute("onClick", "this.disabled=true ,  myFunction(this.value)")
        btn.setAttribute("class", "btnClass1")
        var mydisplay = document.getElementById("display")
        mydisplay.appendChild(btn)
    }
}

function timer() {
    var timeLeft = 30;
    var allowedTime = setInterval(function () {
        timeLeft -= 1;
        document.getElementById("time").innerHTML = "00:" + timeLeft;
        var checkAnswer = myForm.input_answer.value
        var message = "was the correct answer"
        if (checkAnswer == cndWord) {
            message = "IS CORRECT"
            getScore(timeLeft)

            function getScore(timeLeft) {
                cndScore = timeLeft + 10;
                // write to local storage
                document.getElementById("score").innerHTML = "score : " + cndScore

                if (typeof (Storage) !== "undefined") {
                    // Store
                    bestScore = Number(localStorage.getItem("bestCscore"))

                    if (cndScore > bestScore) {
                        localStorage.setItem("bestCscore", cndScore);
                    }
                    // Retrieve
                    document.getElementById("bscore").innerHTML = localStorage.getItem("bestCscore");
                } else {
                    document.getElementById("bscore").innerHTML = "";
                }
            }
            timeLeft = 0;
            console.log("play happy sound")

        }

        if (timeLeft <= 0 || checkAnswer == cndWord) {
            var x = document.getElementById("display").querySelectorAll("button");
            n = x.length;
            for (i = 0; i < n; i++) {
                x[i].disabled = true;
            }
            document.getElementById("solution").innerHTML = "<b>" + cndWord + "</b> " + message;
            clearInterval(allowedTime);

            document.getElementById("meaning").innerHTML = theMeaning

        }
    }, 1000)
}

function myFunction(value) {
    myForm.input_answer.value += value;
}

function resetLetters() {
    myForm.input_answer.value = '';
    var x = document.getElementById("display").querySelectorAll("button");
    n = x.length;
    for (i = 0; i < n; i++) {
        x[i].disabled = false;
    }
}