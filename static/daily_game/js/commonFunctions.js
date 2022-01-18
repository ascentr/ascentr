function timer(gameType) {
  var timeLeft = 30;

  var allowedTime = setInterval(function () {
      timeLeft -= 1;
      document.getElementById("time").innerHTML = "00:" + timeLeft;


      switch (gameType) {
        case 1:
          if (timeLeft <= 0) {
            disableButtons()
            let y = document.querySelectorAll("#saved button")
            lenBtn = y.length

            if (lenBtn == 0) {
              document.getElementById("message").innerHTML = "You did not make any words";
              finishGame(gameType, timeLeft)
              disableButtons()
              clearInterval(allowedTime);
            } else {
              //  on submit calls the submitWord function in dailychallange.js file
              document.getElementById("message").innerHTML = "Please click the word you wish to submit" 
              clearInterval(allowedTime); //return showMeaning;
            }
          }
          break;

        case 2:
          let letScore = sessionStorage.getItem('letScore')
          let numScore = sessionStorage.getItem('numScore')
          var checkAnswer = myForm.answer.value;
          if (checkAnswer == myTarget) {
            numScore = timeLeft + 10;
            timeLeft = 0
            document.getElementById("message").innerHTML = checkAnswer + " IS CORRECT"
          }

          if (timeLeft <= 0) {
            (checkAnswer != myTarget) ? getNscore():
            disableButtons()
            finishGame(gameType)
            clearInterval(allowedTime);
            document.getElementById("roundscore").innerHTML = numScore
            sessionStorage.setItem("numScore", numScore)
            totalScore = Number(numScore) + Number(letScore)
            document.getElementById("totalscore").innerHTML = totalScore
            sessionStorage.setItem("totalScore", totalScore)            
          }

          function getNscore() {
            (checkAnswer > myTarget) ? (diff = checkAnswer - myTarget) : (diff = myTarget - checkAnswer)
            console.log("difference " + diff)
            message = checkAnswer + " is " + diff + " away";
            (diff < 9) ? (numScore = 10 - diff) : (numScore = 0);
            document.getElementById("message").innerHTML = message
          }

          break;
        case 3:

          var checkAnswer = myForm.answer.value;
          if (checkAnswer == cndWord) { 
            conScore = timeLeft + 10;
            message =    `${cndWord} IS CORRECT`
            timeLeft = 0
          }

          if (timeLeft <= 0) {
            if (checkAnswer != cndWord ){
              conScore = 0;
              message = `${cndWord} WAS THE CORRECT ANSWER`
            }

            disableButtons()
            finishGame(gameType)
            clearInterval(allowedTime)
            getMeaning(cndWord, gameType)
            sessionStorage.setItem("conScore", conScore)
            document.getElementById("roundscore").innerHTML = conScore
            totalScore = Number(conScore) + Number(sessionStorage.getItem('numScore')) + Number(sessionStorage.getItem('letScore'))
            sessionStorage.setItem("totalScore", totalScore)   
            document.getElementById("totalscore").innerHTML = totalScore
            document.getElementById("finish").innerHTML = '<button class="btnControl2" onclick="getUrl()" >See Results &#10140;</button>' ;
            finishGame(3 , message)

          }
          break;
      }
    },
    1000)

  }

function finishGame(gameType , message) {

  switch (gameType) {
    case 1:
      document.getElementById("control").innerHTML = ''
      document.getElementById("finish").innerHTML =
        '<button class="btnControl2" onclick="getUrl()" >Continue to Numbers Game &#10140;</button>'
      break;
    case 2:
      document.getElementById("finish").innerHTML =
        '<button class="btnControl2" onclick="getUrl()" >Continue to Conundrum &#10140;</button>'
      break;
    case 3:
      document.getElementById('message').innerHTML = message
      document.getElementById("finish").innerHTML = 
        `You have played all three rounds and scored ${totalScore} points <br/>
        <button class="btnControl2" onclick="getUrl()" >Review and Submit Results &#10140;</button>`
      break;
  }
}

function getScore(gameType, timeLeft) {

  switch (gameType) {
    case 1:
      console.log("The length is " + timeLeft)
      lenWord = timeLeft
      if (lenWord <= 6) {
        letScore = lenWord * 2;
      } else {
        switch (lenWord) {
          case 7:
            letScore = 15
            break;
          case 8:
            letScore = 20
            break;
          case 9:
            letScore = 25
            break;
        }
      }
      var totalScore = letScore
      sessionStorage.setItem("letScore", letScore)
      sessionStorage.setItem("totalScore", totalScore)
      document.getElementById('message').innerHTML = ''
      document.getElementById("roundscore").innerHTML = letScore;
      document.getElementById("totalscore").innerHTML = totalScore;
      break;

    case 2:
      break;

    case 3:
      break;
  }
}


function disableButtons() {
  var x = document.getElementById("display").querySelectorAll("button");
  n = x.length;
  for (i = 0; i < n; i++) {
    x[i].disabled = true;
  }
}

function clearDisplay() {
  document.getElementById("display").innerHTML = '';
  document.getElementById('gamediv').innerHTML = '';
}

function newDisplay() {
  document.getElementById("gamediv").innerHTML = ''
}

function getUrl() {
  switch (gameType) {
    case 1:
      location.href = "\..\\numbers"
      break;

    case 2:
      location.href = "\..\\word"
      break;

    case 3:
      location.href = "\..\\results"
      break;
    }
}

function displayScores() {
  console.log("game has just finished")
  // letScore = Number(sessionStorage.getItem("letScore"))
  // numScore = Number(sessionStorage.getItem("numScore"))
  // conScore = Number(sessionStorage.getItem("conScore"))
  // totalScore = Number(sessionStorage.getItem("totalScore"))
  //window.open('/finish', '_self')
  
  // document.getElementById("let_score").value=letScore
  // document.getElementById("num_score").value=numScore
  // document.getElementById("con_score").value=conScore
  // document.getElementById("total_score").value=totalScore
}

// function submitScores(){
//   letScore = Number(sessionStorage.getItem("letScore"))
//   numScore = Number(sessionStorage.getItem("numScore"))
//   conScore = Number(sessionStorage.getItem("conScore"))
//   totalScore = Number(sessionStorage.getItem("totalScore"))
//   //document.getElementById('scores').submit()
//   mydata = document.getElementById('scores');
//   mydata.submit()
// }