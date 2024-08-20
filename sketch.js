function setup() {
  createCanvas(600, 650);
}
let beeX = 200;
let beeY = 250;
let plants = [];
let coins = 100;
let gameRunning = true;
let gameMessage = '';
let daisyStats = ["🌼", 2500, 5000, 20, true];
let sunflowerStats = ["🌻", 4000, 6000, 50, false];
let tulipStats = ["🌷", 3000, 4000, 35, false];
let level = 1;
let plantIcons = ["🌼"]
let startTime = null;
let totalDuration = 2 * 60 * 1000; 
// Storm random time, storm done, storm done time, storm message
let storm = [Math.floor(Math.random() * (105000 - 5000 + 1)) + 5000, false, null, false];
let investor = [Math.floor(Math.random() * (105000 - 5000 + 1)) + 5000, false, null, false];
let theives = [Math.floor(Math.random() * (105000 - 5000 + 1)) + 5000, false, null, false];
let instructionsShown = false;
let disease = [null, false, false];
let textShowing = false;
function draw() {
  if (!instructionsShown) {
    textSize(20)
    fill("white");
    rect(0, 0, 600, 600);
    fill("black");
    text("How to play", 10, 50)
    text("Move the bee using WASD keys", 10, 75)
    text("Click the number 2 to plant a daisy and 1 to harvest", 10, 100)
    text("Unlocking new plant = more numbers you can use", 10, 125)
    text("Press p to play", 10, 150)
    return;
  }
  if (gameRunning == false) {
    fill("white");
    rect(0, 0, 600, 650);
    fill("black");
    text(gameMessage, 10, 200)
    text("Coins: " + coins, 10, 300)
    return;
  }
  if (coins < 0) {
    gameRunning = false;
    gameMessage = 'You have gone bankrupt!';
  }
  if (instructionsShown) {
    if (startTime == null) {
      startTime = new Date();
    }
    let currentTime = new Date();// 5 minutes in milliseconds
  let timeDifference = currentTime - startTime; // Time elapsed in milliseconds
  let timeRemaining = totalDuration - timeDifference;
  if (timeRemaining < 0) {
    timeRemaining = 0;
    gameRunning = false;
    gameMessage = 'Your game has ended'
  }

  let minutes = Math.floor(timeRemaining / (60 * 1000)); // Calculate remaining minutes
  let seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000); // Calculate remaining seconds
  checkFlowerStatus();
  if (disease[0] == null) {
    if (disease[2] == true) {
      if (textShowing == false) {
        disease[0] = new Date();
        disease[1] = true;
        disease[2] = false;
        textShowing = true;
        coins = Math.floor(coins / 2);
      }
    } else {
      let counter = 0;
      for (let i = 0; i < plants.length; i++) {
        if (plants[i][0] == "🥀") {
          counter += 1;
        }
      }
      if (counter > 4) {
        let random = Math.floor(Math.random() * 4);
        if (random > 3) {
          disease[2] = true;
        }
      }
    }
  } else {
    let diseaseTimeDifference = currentTime - disease[0];
    if (diseaseTimeDifference > 10000) {
      disease[0] = null;
    }
  }
  //sky blue background
  background("#87CEEB");
  //sun in top right
 
  //grass on bottom half

  stroke(0);//black outline

  strokeWeight(1);//outline thickness

  fill("#41980A");

  rect(0, 200, 600, 600);
 
  //emojis
  textSize(50)
  strokeWeight(0);
  for (let i = 0; i < plants.length; i++) {
    let currentTime = new Date();
    let timeDifference = currentTime - plants[i][3];
    if (timeDifference > plants[i][7]) {
      plants[i][0] = "🥀";
    } else if (timeDifference > plants[i][6]) {
      plants[i][0] = plants[i][5];
    }
    text(plants[i][0], plants[i][1], plants[i][2]);
  }

  //flower
  text("🐝", beeX, beeY)
  fill("brown");
  rect(0, 525, 600, 125)
  let info;
  fill("black");
  for (let i = 0; i < plantIcons.length; i++) {
    textSize(60)
    text(plantIcons[i], i * 150 + 30, 585)
    if (daisyStats[0] == plantIcons[i]) {
      info = i + 2 + ":🪙" + daisyStats[3];
    } else if (sunflowerStats[0] == plantIcons[i]) {
      info = i + 2 + ":🪙" + sunflowerStats[3];
    } else {
      info = i + 2 + ":🪙" + tulipStats[3];
    }
    textSize(30)
    text( info, i * 150 + 20, 630)
  }
  strokeWeight(0);
  fill("black");
  text("🪙" + coins, 10, 50)
  text("Time: " + minutes + ":" + seconds, 450, 50)
  if (storm[1] == false) {
      if (storm[0] > timeRemaining) {
        if (!textShowing) {
          storm[1] = true;
          storm[3] = true;
          storm[2] = new Date();
          for (let i = 0; i < Math.floor(plants.length / 4); i++) {
            plants.splice(0, 1);
          }
          textShowing = true;
        }
    }
  }
  if (thieves[1] == false) {
    if (thieves[0] > timeRemaining) {
      if (!textShowing) {
        thieves[1] = true;
        thieves[3] = true;
        thieves[2] = new Date();
        coins = Math.floor(coins * 0.75);
        textShowing = true;
      }
  }
  }
  if (investor[1] == false) {
    if (investor[0] > timeRemaining) {
      if (!textShowing) {
        investor[1] = true;
        investor[3] = true;
        investor[2] = new Date();
        coins = Math.floor(coins * 1.25);
        textShowing = true;
      }
    }
  }
  if (storm[3] == true) {
    if ((currentTime - storm[2]) > 5000) {
      storm[3] = false;
      textShowing = false;
    } else {
      textShowing = true;
      fill("black");
      text("There was a storm!", 20, 100);
      text("You have lost half of your crops", 20, 150);
    }
  }
  if (investor[3] == true) {
    if ((currentTime - investor[2]) > 5000) {
      investor[3] = false;
      textShowing = false;
    } else {
      textShowing = true;
      fill("black");
      text("A bee came to invest in your business.", 20, 100);
      text("He has increased your coins by 25%", 20, 150);
    }
  }
  if (thieves[3] == true) {
    if ((currentTime - thieves[2]) > 5000) {
      thieves[3] = false;
      textShowing = false;
    } else {
      textShowing = true;
      fill("black");
      text("Theives broke into your beehive and stole your money", 20, 100);
      text("You have lost 75% of your coins", 20, 150);
    }
  }
  if (disease[1] == true) {
    if ((currentTime - disease[0]) > 5000) {
      disease[1] = false;
      textShowing = false;
    } else {
      textShowing = true;
      fill("black");
      text("You left too many dead flowers out", 100, 100);
      text("You have lost half your coins", 100, 150);
    }
  }

}
}
function checkFlowerStatus(){
  if (coins > 150) {
    if (!tulipStats[4]){
      tulipStats[4] = true;
      plantIcons.push(tulipStats[0]);
    }
  } if (coins > 200) {
    if (!sunflowerStats[4]){
      sunflowerStats[4] = true;
      plantIcons.push(sunflowerStats[0]);
    }
  }
  }
function keyPressed() {
  let plantPosition = -1;
  let plantX = beeX;
  let plantY = beeY + 50;
  if (key === '1') {
    for (let i = 0; i < plants.length; i++) {
      if (plants[i][1] == plantX){
        if (plants[i][2] == plantY){
          plantPosition = i;
        }
      }
    }
    if (plantPosition > -1){
      let plantType = plants[plantPosition][4];
      if (plants[plantPosition][0] == "🥀") {
        plants.splice(plantPosition, 1);
      } else if (plants[plantPosition][0] != "🌱") {
        coins += plants[plantPosition][8];
        plants.splice(plantPosition, 1);
      }
    } 
  } else if (key === '2') {
    for (let i = 0; i < plants.length; i++) {
      if (plants[i][1] == plantX){
        if (plants[i][2] == plantY){
          plantPosition = i;
        }
      }
    }
    if (plantPosition == -1){
      if (plantY > 200 && plantY < 550){
        let length = plants.length;
        let time = new Date();
        plants[length] = (["🌱", plantX, plantY, time, "daisy", daisyStats[0], daisyStats[1], daisyStats[2], daisyStats[3]]);
        coins -= 10;
      }
    }
  } else if(key === '3') {
    if (tulipStats[4]) {
      for (let i = 0; i < plants.length; i++) {
        if (plants[i][1] == plantX){
          if (plants[i][2] == plantY){
            plantPosition = i;
          }
        }
      }
      if (plantPosition == -1){
        let length = plants.length;
        let time = new Date();
        plants[length] = (["🌱", plantX, plantY, time, "sunflower", tulipStats[0], tulipStats[1], tulipStats[2], tulipStats[3]]);
        coins -= 10;
      }
    }
  } else if(key === '4') {
    if (sunflowerStats[4]) {
      for (let i = 0; i < plants.length; i++) {
        if (plants[i][1] == plantX){
          if (plants[i][2] == plantY){
            plantPosition = i;
          }
        }
      }
      if (plantPosition == -1){
        let length = plants.length;
        let time = new Date();
        plants[length] = (["🌱", plantX, plantY, time, "sunflower", sunflowerStats[0], sunflowerStats[1], sunflowerStats[2], sunflowerStats[3]]);
        coins -= 10;
      }
    }
  }
  else if(key === 'w') {
    if (beeY - 50 > 0) {
      beeY -= 50;
    }
  } else if (key === 's') {
    if (beeY + 50 < 600) {
      beeY += 50;
    }
  } else if (key === 'a') {
    if (beeX - 50 > -50) {
      beeX -= 50;
    }
  } else if (key === 'd') {
    if (beeX + 50 < 600) {
      beeX += 50;
    }
  } else if (key === 'p') {
    if (!instructionsShown) {
      instructionsShown = true;
    }
  }
}