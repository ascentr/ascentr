LargeNumArray = [25, 50, 75, 100]
SmallNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
myArray = [];
tempArray = [];
newArray = [];
txt = ""
calcy.answer.value = ""
arrElements = "";
numScore = 0
max4 = 0;
min6 = 0;

document.getElementById("calculator-display").disabled = true; // only input into calculator field by clicking selected numbers;
document.getElementById("message").innerHTML = "Select six large (Max 4) or small numbers to play."
document.getElementById("bscore").innerHTML = localStorage.getItem("bestNscore");



function copyArray(value, index, array) {
  tempArray.push(value);
}

function getLargeNum() {
  var x = document.querySelectorAll("#display button")
  var lenBtn = x.length
  var btnId = 'btn0' + lenBtn;
  if (lenBtn < 6 && max4 < 4) {
    var lrgNum = LargeNumArray[Math.floor(Math.random() * LargeNumArray.length)]
    var btn = document.createElement("button")
    btn.setAttribute("value", lrgNum)
    btn.innerHTML = lrgNum
    btn.setAttribute("class", "btnClass1")
    btn.setAttribute("id", btnId)
    btn.setAttribute("onClick", "this.disabled=true ,  valueToCalc(this.value, this.id)")
    var mydisplay = document.getElementById("display")
    mydisplay.appendChild(btn)
      ++max4;
    myArray.push(lrgNum);
    tempArray.push(lrgNum);
  }
}

function getSmallNum() {
  var x = document.querySelectorAll("#display button")
  var lenBtn = x.length
  var btnId = 'btn0' + lenBtn;

  if (lenBtn < 6) {
    var smlNum = SmallNumArray[Math.floor(Math.random() * SmallNumArray.length)]
    var btn = document.createElement("button")
    btn.setAttribute("value", smlNum)
    btn.innerHTML = smlNum
    btn.setAttribute("class", "btnClass1")
    btn.setAttribute("id", btnId)
    btn.setAttribute("onClick", "this.disabled=true ,  valueToCalc(this.value, this.id)")
    var mydisplay = document.getElementById("display")
    mydisplay.appendChild(btn)
    myArray.push(smlNum);
    tempArray.push(smlNum);
  }
}

function valueToCalc(value, id) {
  var displayValue = document.getElementById("calculator-display").value;
  var len = displayValue.length
  var lastChar = displayValue.substr(len - 1)
  if (isNaN(lastChar) == true || len == 0) {
    calcy.answer.value += value;
  } else {
    document.getElementById(id).disabled = false;
    calcy.answer.value = displayValue;
  }
}


function makeBtn() {

  if ((calcy.answer.value).length > 0) {
    console.log((calcy.answer.value).length)
    var x = document.querySelectorAll("#display2 button")
    var lenBtn = x.length
    var btnId = 'btn2' + lenBtn;
    btn2Value = calcy.answer.value
    var btn2 = document.createElement("button")
    btn2.setAttribute("value", btn2Value)
    btn2.setAttribute("id", btnId)
    btn2.setAttribute("class", "btnClass2")
    btn2.setAttribute("onClick", "this.disabled=true,  valueToCalc(this.value, this.id)")
    btn2.innerHTML = eval(calcy.answer.value)
    calcy.answer.value = ""
    var mydisplay = document.getElementById("display2")
    mydisplay.appendChild(btn2)
  }
}

function enableDigits() {
  calcy.answer.value = '';
  var x = document.getElementById("display").querySelectorAll("button")
  document.getElementById("display2").innerHTML = ""
  n = x.length;
  for (i = 0; i < n; i++) {
    x[i].disabled = false;
  }
}

function evalAnswer() {
  calcy.answer.value = eval(calcy.answer.value)
}

function randomSelect(a, b) {
  switch (randomOp) {
    case "div":
      if (a % b == 0) {
        result = a / b;
        txt = txt + a + " / " + b + ", "
        break;
      } else if (b % a == 0) {
        result = b / a;
        txt = txt + b + " / " + a + ", "
        break;
      }

      case "sub":
        if (a > b) {
          result = a - b;
          txt = txt + a + " - " + b + ", ";
          break;
        } else if (b > a) {
          result = b - a;
          txt = txt + b + " - " + a + ", ";
          break;
        }

        case "add":
          result = a + b;
          txt = txt + a + " + " + b + ", ";
          break;

        case "mul":
          result = a * b;
          txt = txt + a + " X " + b + ", ";
          break;
  }
  return result;
}

function checkArray() {
  n = myArray.length
  if (n < 5) {
    alert("Please make sure you have chosen SIX numbers")
  }
}

function randomMaths() {
  document.getElementById("message").innerHTML = ""

  n = myArray.length
  if (n < 5) {
    randomMaths()
  }

  for (i = 0; i < 5; i++) {
    actionArray = ["add", "sub", "mul", "div"]
    randomOp = actionArray[Math.floor(Math.random() * actionArray.length)]; // decide what operation from action array
    var a = tempArray[Math.floor(Math.random() * tempArray.length)]; // get first number
    tempArray.splice(tempArray.indexOf(a), 1); // remove first number from tempArray 
    var b = tempArray[Math.floor(Math.random() * tempArray.length)]; //get second number 
    tempArray.splice(tempArray.indexOf(b), 1) // remove second number from tempArray 
    randomSelect(a, b) // do random arithmatic with 2 numbers & push result back in tempArray array; 
    tempArray.push(result)
    //console.log(tempArray)   
    document.getElementById("result").innerHTML = `Target : ${result}`
    timer()

    while (i == 4) { //check the if the result < 100 or > 999 reset every thing and do again;   
      if (result < 101 || result > 999) {
        tempArray = []
        txt = ""
        arrElements = ""
        myArray.forEach(copyArray);
        randomMaths()
      } else {
        break;
      }
    }
  } // close for loop 

} // end random maths function

function timer() {
  var timeLeft = 35;
  var allowedTime = setInterval(function () {
    document.getElementById("time").innerHTML = "00:" + timeLeft;
    timeLeft -= 1;
    var checkAnswer = calcy.answer.value;

    if (timeLeft < 0 || checkAnswer == result) {
      var x = document.getElementById("display").querySelectorAll("button");
      n = x.length;
      for (i = 0; i < n; i++) {
        x[i].disabled = true;
      }

      getScore(timeLeft)

      function getScore(timeLeft) {

        // score for near answer
        if (timeLeft <= 0 && checkAnswer != result) {
          if (checkAnswer > result) {
            diff = checkAnswer - result;
            message = checkAnswer + " is " + diff + " more than the "+result
            if (diff < 8) {
              numScore = 10 - diff;
            } 
          }else if (checkAnswer < result) {
              diff = result - checkAnswer;
              message = checkAnswer + " is " + diff + " less than the " + result
              if (diff < 8) {
                numScore = 10 - diff;
              }
          }         
          document.getElementById("message").innerHTML = message
        }        
      // score for getting right answer
        if (checkAnswer == result) {
          numScore = timeLeft + 11;
        }    
      }

      document.getElementById("score").innerHTML = "score : "+numScore

      if (typeof (Storage) !== "undefined") {
        // Store
        bestScore = Number(localStorage.getItem("bestNscore"))

        if (numScore > bestScore) {
          localStorage.setItem("bestNscore", numScore);
        }
        // Retrieve
        document.getElementById("bscore").innerHTML = localStorage.getItem("bestNscore");
      } else {
        document.getElementById("bscore").innerHTML = "";
      }

      var solOptions = "<input type='button' class='btnControl2' value='Solution' onClick='showSol()'></input> &nbsp;" +
        "<input type='button' class='btnControl2' value='Play Again' onClick='document.location.reload(true)'></input> &nbsp;" +
        "<input type='button' class='btnControl2' value='Share' onClick='document.location.reload(true)'></input>"
      document.getElementById("finish").innerHTML = solOptions;
      clearInterval(allowedTime);
    }

  }, 1000)
}

function backSpace() {
  var opArray = ["+", "-", "*", "/", "(", ")"]
  var value = document.getElementById("calculator-display").value;
  var len = value.length
  var lastChar = value.substr(len - 1)
  var n = opArray.includes(lastChar)
  if (n == true) {
    document.getElementById("calculator-display").value = value.substr(0, value.length - 1)
  } else {
    document.getElementById("calculator-display").value = value
  }
}

function showSol() {
  document.getElementById("solution").innerHTML = txt
}