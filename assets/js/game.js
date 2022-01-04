// START GAME FUNCTIONS

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var fightOrSkip = function() {
  // ask player if they would like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
  if (promptFight === "" || promptFight === null) {
    window.alert("You will need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();
  // if player picks "skip" confirm and then stop loop
  if (promptFight === "skip") {
    //confirm player would like to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // Subtract money from player for skipping fight
      playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);

      return true;
    }
  }
  return false;
};

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {

  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      if (fightOrSkip()) {
        break;
      }
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // Remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + 
        " attacked " +
        enemy.name +
        ". " +
        " now has " +
        enemy.health + 
        " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove players health by subtracting the amount we set in the damage variable.
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
        " attacked " +
        playerInfo.name +
        ". " + 
        playerInfo.name +
        " now has " +
        playerInfo.health +
        " health remaining."
      );

      // checks players health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died");
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    isPlayerTurn = !isPlayerTurn;
  }
};

var startGame = function() {
	// Reset player stats
  playerInfo.reset();

	for (var i = 0; i < enemyInfo.length; i++) {
		if (playerInfo.health > 0) {
			window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
			var pickedEnemyObj = enemyInfo[i];

			pickedEnemyObj.health = randomNumber(40, 60);

			fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask  if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store function
        if (storeConfirm) {
          shop();
        }
      }
		}
		else {
			window.alert("You have lost your robot in battle! Game Over!");
			break;
		}
	}

	endGame();
};

var endGame = function() {
	// if player is still alive, player wins!
	if (playerInfo.health > 0) {
		window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
	} else {
		window.alert("You've lost your robot in battle.");
	}

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Robot Gladiators! Come back soon!');
  }
}

var shop = function() {
  // ask player what theyd like to do.
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out action
  debugger;
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("leaving the store.");
      //do nothing so function will end.
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      // call shop() to force player to pick valid option.
      shop();
      break;
  }
};
// END GAME FUNCTIONS

// GAME INFORMATION / VARIABLES
// PLAYER INFORMATION

var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?")
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 Dollars.");
    
    this.health +=20;
    this.money -=7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -=7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

// ENEMY INFORMATION
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// END GAME INFORMATION/VARIABLES

// run game
startGame();