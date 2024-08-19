function setup() {
  //creates a canvas 600 pixels wide
  //and 400 pixels high
  createCanvas(600, 600);
}
let beeX = 200;
let beeY = 250;
let plants = [];
let coins = 100;
let gameRunning = true;
let gameMessage = '';
let daffodilUnlocked = false;
let sunflowerUnlocked = false;
let daisyStats = ["🌼", 2500, 5000, 2000];
let sunflowerStats = ["🌻", 1000, 5000, 4000];
let tulipStats = ["🌷", 3000, 5000, 6000];
let level = 1;
let startTime = new Date();
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
  //sky blue background
  background(135, 206, 235);
 
  //grass on bottom half

  stroke(0);//black outline

  strokeWeight(1);//outline thickness

  fill("green");

  rect(0, 200, 600, 600);
 
  //emojis
  textSize(50)
  for (let i = 0; i < plants.length; i++) {
    let currentTime = new Date();
    let timeDifference = currentTime - plants[i][3];
    if (timeDifference > 5000) {
      plants[i][0] = "🥀";
    } else if (timeDifference > 2500) {
      plants[i][0] = "🌹";
    }
    text(plants[i][0], plants[i][1], plants[i][2])
  }

   //flower
   strokeWeight(0);
   fill("black");
  text("🐝", beeX, beeY)
  let currentTime = new Date();
  let totalDuration = 2 * 60 * 1000; // 5 minutes in milliseconds
  let timeDifference = currentTime - startTime; // Time elapsed in milliseconds
  let timeRemaining = totalDuration - timeDifference;

  if (timeRemaining < 0) {
    timeRemaining = 0;
    gameRunning = false;
    gameMessage = 'Your game has ended'
  }

  let minutes = Math.floor(timeRemaining / (60 * 1000)); // Calculate remaining minutes
  let seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000); // Calculate remaining seconds
  textSize(30)
  text("coins: " + coins, 10, 50)
  text("Time: " + minutes + ":" + seconds, 450, 50)
}
function keyPressed() {
  
  if (key === '1') {
    let plantPosition = -1;
    let plantX = beeX;
    let plantY = beeY + 50;
    for (let i = 0; i < plants.length; i++) {
      if (plants[i][1] == plantX){
        if (plants[i][2] == plantY){
          plantPosition = i;
        }
      }
    }
    if (plantPosition > -1){
      if (plants[plantPosition][0] == "🥀") {
        plants.splice(plantPosition, 1);
      } else if (plants[plantPosition][0] == "🌹") {
        plants.splice(plantPosition, 1);
        coins += 20;
      }
    } else {
      let length = plants.length;
      let time = new Date();
      plants[length] = (["🌱", plantX, plantY, time]);
      coins -= 10;
    }
  } else if(key === 'w') {
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