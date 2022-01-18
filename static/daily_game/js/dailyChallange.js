txt = ""
arrElements = "";
nums_answer = ''


function makeButtons(sourceArray, howMany, gameType) {

  // console.log(`game type : ${gameType} array ${sourceArray}, my target ${myTarget}` )

  switch (gameType) {
    case 1:
      myArray = letArray
      document.getElementById("input-letters").style.visiblity = 'visible'
      document.getElementById("control").innerHTML =
        '<button type="button" class="btnControl2" value="Clear" onclick="resetLetters()" > Clear</button>' +
        '<button type="button" class="btnControl2" value="Save Word" onclick="saveWord()" > save </button> '
      break;
    case 2:
      myArray = numArray
      document.getElementById("display").innerHTML = ''
      document.getElementById("target").innerHTML = myTarget;
      break;
    case 3:
      cndWord = cndWord.toUpperCase() 
      var cndShuffle = cndWord.split("")
      myArray = shuffle(cndShuffle);

      document.getElementById("control").innerHTML =
        '<button type="button" class="btnControl2" value="Clear" onclick="resetLetters()" > Clear</button>' +
        '<button type="button" class="btnControl2" value="Save Word" onclick="backSpace(gameType)" > Delete </button> '

    }

  for (i = 0; i < howMany; i++) {
    let btn = document.createElement("button")
    btn.setAttribute("onClick", "this.disabled=true, myFunction(this.value)")
    var myLetter = myArray[i]
    btn.setAttribute("class", "btnClass1")
    var mydisplay = document.getElementById("display")
    mydisplay.appendChild(btn)
    btn.setAttribute('value', myLetter)
    btn.innerHTML = myLetter
  }
  var topDiv = document.getElementById('control')
  // topDiv.innerHTML = ''
//  var finishDiv = document.getElementById('finish')
  timer(gameType);
}

function myFunction(value) {
  myForm.input_answer.value += value;
}

function resetLetters() {
  myForm.input_answer.value = '';
  let x = document.getElementById("display").querySelectorAll("button");
  n = x.length;
  for (i = 0; i < n; i++) {
    x[i].disabled = false;
  }
  let y = document.getElementById("saved").querySelectorAll("button");
  n = y.length;
  for (i = 0; i < n; i++) {
    y[i].disabled = false;
  }
}

function saveWord() {
  let x = document.querySelectorAll("#saved button")
  var lenBtn = x.length
  var btnId = 'btn2' + lenBtn;

  wrdValue = myForm.answer.value
  if (wrdValue != '') {
    var newWrd = document.createElement("button")
    newWrd.setAttribute("value", wrdValue)
    newWrd.setAttribute("class", "btnClass2")
    newWrd.setAttribute("id", btnId)
    newWrd.setAttribute("onClick", "submitWord(this.value , this.id)")
    newWrd.innerHTML = wrdValue;
    var mydisplay = document.getElementById("saved")
    mydisplay.appendChild(newWrd)
  }
}

function submitWord(value, id) {
  // disable all the non selected saved words.
  myId = id
  let x = document.querySelectorAll("#saved button")
  lenBtn = x.length

  for (i = 0; i < lenBtn; i++) {
    if (x[i].id != myId) {
      x[i].disabled = true;
    }
  }
  var theWord = value;
  // use async await
  getMeaning(theWord, gameType)
}
// called inside submitWord getMeaning = (theWord) => {
function getMeaning(theWord, gameType) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_GB/${theWord}`)
    
    .then(function(response){
      if (response.status == 404){
          document.getElementById("message").innerHTML = `Sorry ${theWord} is not in the dictionary`
      }
      if (response.status == 200){
          var lenWord = theWord.length
         
          getScore(gameType , lenWord)
      }
      return response.json();
    })

    .then(
      function iterateObject(data) {
        var meanCont = document.getElementById('meaning')
        var ul = document.createElement('ul');
        ul.classList.add("list-style");
        for (var item in data) {
          if (typeof(data[item]) == "object") {
            iterateObject(data[item])
          } else {
            if (item == "definition"){
              var li = document.createElement('li')
              li.innerHTML = data[item]
              ul.appendChild(li)
            }
          }    
        }
        meanCont.appendChild(ul)
      }
    )

    .catch(error => {
        console.log(error)
    })

  finishGame(gameType)
}


/*-----------------Numbers Game---------------------*/

function evalAnswer() {
  myForm.answer.value = eval(myForm.answer.value)
}

function makeBtn() {

  if ((myForm.answer.value).length > 0) {
    var x = document.querySelectorAll("#display2 button")
    var lenBtn = x.length
    var btnId = 'btn2' + lenBtn;
    btn2Value = myForm.answer.value
    var btn2 = document.createElement("button")
    btn2.setAttribute("value", btn2Value)
    btn2.setAttribute("id", btnId)
    btn2.setAttribute("class", "btnClass2")
    btn2.setAttribute("onClick", "this.disabled=true,  valueToCalc(this.value, this.id)")
    btn2.innerHTML = eval(myForm.answer.value)
    myForm.answer.value = ""
    var mydisplay = document.getElementById("display2")
    mydisplay.appendChild(btn2)
  }
}
function valueToCalc(value, id) {
  var displayValue = document.getElementById("input_answer").value;
  var len = displayValue.length
  var lastChar = displayValue.substr(len - 1)
  if (isNaN(lastChar) == true || len == 0) {
    myForm.answer.value += value;
  } else {
    document.getElementById(id).disabled = false;
    myForm.answer.value = displayValue;
  }
}

function backSpace() {

  switch (gameType) {
    case 1:
      break;
    case 2:
      var opArray = ["+", "-", "*", "/", "(", ")"]
      var value = document.getElementById("input_answer").value;
      var len = value.length
      var lastChar = value.substr(len - 1)
      var n = opArray.includes(lastChar)
      if (n == true) {
        document.getElementById("input_answer").value = value.substr(0, value.length - 1)
      } else {
        document.getElementById("input_answer").value = value
      }
      break;

    case 3:
      var value = document.getElementById("input_answer").value;
//      var len = value.length
//      var lastChar = value.substr(len - 1)
      document.getElementById("input_answer").value = value.substr(0, value.length - 1)
      break;  
  }
}

function enableDigits() {
  myForm.answer.value = '';
  var x = document.getElementById("display").querySelectorAll("button")
  document.getElementById("display2").innerHTML = ""
  n = x.length;
  for (i = 0; i < n; i++) {
    x[i].disabled = false;
  }
}

function shuffle(array) {
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
