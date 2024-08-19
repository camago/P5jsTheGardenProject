function setup() {
  createCanvas(600, 600);
}
let beeX = 200;
let beeY = 250;
let plants = [];
let coins = 100;
let gameRunning = true;
let gameMessage = '';
let daisyStats = ["🌼", 2500, 5000, 20, true];
let sunflowerStats = ["🌻", 4000, 2000, 50, false];
let tulipStats = ["🌷", 3000, 4000, 35, false];
let level = 1;
let plantIcons = ["🌼"]
let startTime = new Date();
let totalDuration = 2 * 60 * 1000; 
const storm = Math.floor(Math.random() * (105000 - 10000 + 1)) + 10000;
let stormDone = false;
let stormTime = null;
let stormMessage = false;
function draw() {
  if (gameRunning == false) {
    fill("white");
    rect(0, 0, 600, 600);
    fill("black");
    text(gameMessage, 10, 200)
    text("Coins: " + coins, 10, 300)
    return;
  }
  if (coins < 0) {
    gameRunning = false;
    gameMessage = 'You have gone bankrupt!';
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
  if (coins > 150) {
    level = 2;
    sunflowerUnlocked = true;
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
  rect(0, 525, 600, 75)
  for (let i = 0; i < plantIcons.length; i++) {
    text(plantIcons[i], i * 50 + 20, 580)
  }
  textSize(30)
  strokeWeight(0);
   fill("black");
  text("🪙" + coins, 10, 50)
  text("Time: " + minutes + ":" + seconds, 450, 50)
  if (stormDone == false) {
    if (storm > timeRemaining) {
      stormDone = true;
      stormMessage = true;
      stormTime = new Date();
      for (let i = 0; i < Math.floor(plants.length / 2); i++) {
        plants.splice(0, 1);
      }
  }
  }
  if (stormMessage == true) {
    if ((currentTime - stormTime) > 5000) {
      stormMessage = false;
    } else {
      fill("black");
      text("There was a storm!", 100, 100);
      text("You have lost half of your crops", 100, 150);
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
  }
  // Uncomment to prevent any default behavior.
  // return false;
}